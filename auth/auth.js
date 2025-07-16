const express = require('express');
const axios = require('axios');
const User = require('../models/users');

const router = express.Router();

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:5173/members/general';

// בדיקת תקשורת פשוטה
router.get('/test', (req, res) => {
  res.send('LinkedIn authRoutes is working!');
});

// נקודת כניסה לאחר ההפניה מ־LinkedIn
router.get('/linkedin/callback', async (req, res) => {
  const { code } = req.query;
  console.log('🔁 Received LinkedIn code:', code);

  try {
    // שלב 1 – בקשת access token
    console.log('🔐 Requesting access token...');
    const tokenRes = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      null,
      {
        params: {
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const accessToken = tokenRes.data.access_token;
    console.log('✅ Received access token:', accessToken);

    // שלב 2 – בקשת פרטי משתמש לפי OpenID
    console.log('👤 Requesting user info (via OpenID Connect)...');
    const userInfoRes = await axios.get(
      'https://www.linkedin.com/oauth/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const userInfo = userInfoRes.data;
    console.log('📦 User info:', userInfo);

    const linkedinId = userInfo.sub;
    const firstName = userInfo.given_name;
    const lastName = userInfo.family_name;
    const email = userInfo.email;
    const profilePicture = userInfo.picture || '';

    // שמירה למסד נתונים
    let user = await User.findOne({ where: { linkedin_Id: linkedinId } });

    if (!user) {
      user = await User.create({
        linkedin_Id: linkedinId,
        first_name: firstName,
        last_name: lastName,
        email,
        profile_picture: profilePicture,
        linkedin_url: '' // OpenID לא מחזיר vanityName
      });
    }

    // שליחת מידע חזרה לקליינט
    res.json({
      id: user.id,
      firstName,
      lastName,
      email,
      profilePicture
    });

  } catch (err) {
    console.error('❌ LinkedIn auth failed:', err.response?.data || err.message);
    res.status(500).json({ error: 'LinkedIn authentication failed' });
  }
});

module.exports = router;
