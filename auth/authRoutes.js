const express = require('express');
const axios = require('axios');

const router = express.Router();

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:5173/members/general';


router.get('/test', (req, res) => {
  const result = res.send('LinkedIn authRoutes is working ✅');
  console.log(result);
});

router.get('/linkedin/callback', async (req, res) => {
  const { code } = req.query;
  console.log('📥 קיבלנו קוד מ-LinkedIn:', code);

  try {
    console.log('🔐 מבקשים access token...');
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

    console.log('✅ קיבלנו access token:', accessToken);

    console.log('📄 מבקשים פרופיל משתמש...');
    const profileRes = await axios.get(
      'https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,vanityName,profilePicture(displayImage~:playableStreams))',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    console.log('🧠 פרטי פרופיל:', profileRes.data);
const emailRes = await axios.get(
      'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

     const linkedinId = profileRes.data.id;
    const firstName = profileRes.data.localizedFirstName;
    const lastName = profileRes.data.localizedLastName;
    const email = emailRes.data.elements[0]['handle~'].emailAddress;
    const profilePicture = profileRes.data.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier || '';
    const vanityName = profileRes.data.vanityName;
    const linkedinUrl = vanityName ? `https://www.linkedin.com/in/${vanityName}` : '';


    // שמירה למסד נתונים (אם קיים, לא ניצור שוב)
    let user = await User.findOne({ linkedinId });
    if (!user) {
      user = await User.create({
        linkedinId,
        firstName,
        lastName,
        email,
        profilePicture,
        linkedinUrl
      });
    }

    // מחזיר ללקוח את המידע
    res.json({
      id: user._id,
      firstName,
      lastName,
      email,
      profilePicture,
      linkedinUrl
    });
  } catch (err) {
    console.error('❌ LinkedIn auth failed:', err.response?.data || err.message);
    res.status(500).json({ error: 'LinkedIn authentication failed' });
  }
});

module.exports = router;
