const express = require('express');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/cv'); // ודאי שהתיקייה קיימת!
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// POST /upload/cv
router.post('/cv', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // שליחת הקובץ ל־AGENT AI
    const form = new FormData();
    form.append('file', fs.createReadStream(req.file.path));

    const response = await axios.post('https://agentai.example.com/api/parse', form, {
      headers: {
        ...form.getHeaders()
      }
    });

    const parsedData = response.data;
    console.log("Received file:", req.file);

    console.log("Parsed CV Data:", parsedData);

    // כאן: אפשר לבצע שמירה למסד נתונים לפי המבנה שלך

    res.status(200).json({ message: 'CV parsed successfully', parsedData });

  } catch (err) {
    console.error('CV upload or parsing error:', err.message);
    res.status(500).json({ error: 'Failed to upload or parse CV' });
  }
});

module.exports = router;