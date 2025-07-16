const express = require('express');
const multer = require('multer');
const path = require('path');
const xlsx = require('xlsx');
const userService = require('../services/usersService');

const router = express.Router();

// הגדרת אחסון לקובצי Excel
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/excel/'); // ודאי שהנתיב הזה קיים
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// סינון לקבצי Excel בלבד
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes('excel') ||
    file.mimetype.includes('spreadsheetml')
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only Excel files are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

//  נקודת קצה אחת בלבד!
router.post('/excel', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    console.log(' Excel Data:', data);

    const createdUsers = [];

    for (const row of data) {
      // שימי לב להתאים לשמות השדות שלך במסד הנתונים
      const newUser = await userService.createUser({
        profile_picture: row.profile_picture,
        first_name: row.first_name,
        last_name: row.last_name,
        phone: row.phone,
        email: row.email,
        password: row.password,
        city: row.city,
        years_of_experience: row.years_of_experience,
        linkedin_Id: row.linkedin_Id,
        facebook_url: row.facebook_url,
        linkedin_url: row.linkedin_url,
        community_value: row.community_value,
        additional_info: row.additional_info,
        wants_updates: row.wants_updates,
        admin_notes: row.admin_notes,
        created_at: row.created_at || new Date()
      });

      createdUsers.push(newUser);
    }

    res.status(200).json({ message: 'Excel uploaded and parsed', data });
  } catch (err) {
    console.error(' Parsing error:', err);
    res.status(500).json({ error: 'Upload or parsing failed' });
  }
});

module.exports = router;
