const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mammoth = require('mammoth');
const OpenAI = require('openai');
const User = require('../models/users'); 
const responseText = completion.choices[0].message.content;

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'upload/cv'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/cv', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const filePath = path.resolve(req.file.path);
    const fileBuffer = fs.readFileSync(filePath);
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    const fileContent = result.value;

    const prompt = `
המסמך הבא הוא קורות חיים בפורמט טקסטואלי (doc/docx שהומר ל־text).
אנא המתר אותו לאובייקט JSON המכיל את השדות הבאים:
[
  "profile_picture", "first_name", "last_name", "phone", "email", "password", "city",
  "years_of_experience", "linkedin_Id", "facebook_url", "linkedin_url",
  "community_value", "additional_info", "wants_updates", "admin_notes", "created_at"
]

אם חסר מידע כלשהו, הכנס "N/A" לשדות מסוג טקסט, 0 לשדות מסוג מספר ו-false לשדות מסוג בוליאני. הנה תוכן הקובץ:
"""
${fileContent}
"""`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'אתה עוזר שמנתח קורות חיים.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2,
    });

    const responseText = completion.choices[0].message.content;

    let jsonData;
    try {
      jsonData = JSON.parse(responseText.replace(/```json|```/g, ''));
    } catch (e) {
      return res.status(400).json({ error: 'Failed to parse JSON from OpenAI response', raw: responseText });
    }

    // יצירת משתמש במסד הנתונים
    const user = await User.create(jsonData);

    res.status(200).json({ message: 'CV parsed and user created successfully', user });

  } catch (err) {
    console.error('CV processing error:', err);
    res.status(500).json({ error: 'Failed to process CV via OpenAI', details: err.message });
  }
});

module.exports = router;
