/*const express = require('express');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/cv'); 
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
    console.log("File uploaded, sending to AI:", req.file.path);

    const response = await axios.post('https://agentai.example.com/api/parse', form, {
      headers: {
        ...form.getHeaders()
      }
    });

    const parsedData = response.data;
    console.log("Received file:", req.file);

    console.log("Parsed CV Data:", parsedData);

     
    const  newUser = await User.create({
      id: Date.now(),
      profile_picture: '',
      first_name: 'Esther',
      last_name: 'Malka',
      phone: '050-1234567',
      email: 'esther@example.com',
      password: 'secret',
      city: 'Jerusalem',
      years_of_experience: 5,
      linkedin_Id: 'esthermalka',
      facebook_url: 'https://facebook.com/esther.malka',
      linkedin_url: 'https://linkedin.com/in/esthermalka',
      community_value: 8,
      additional_info: 'Looking for new challenges.',
      wants_updates: true,
      admin_notes: 'Imported from CV',
      created_at: new Date()
    });

    console.log("Parsed CV Data (mock):", parsedData);


    res.status(200).json({ message: 'CV parsed successfully', parsedData });

  } catch (err) {
    console.error('CV upload or parsing error:', err.message);
    res.status(500).json({ error: 'Failed to upload or parse CV' });
  }
});

module.exports = router;*/