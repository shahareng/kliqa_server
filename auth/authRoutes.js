const express = require('express');
const axios = require('axios');
const User = require('../models/users');

const router = express.Router();

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;


const REDIRECT_URI = `http://localhost:5173/members/general`


router.get('/test', (req, res) => {
  const result = res.send('LinkedIn authRoutes is working!');
  console.log(result);
});

router.get('/linkedin/callback', async (req, res) => {2
  const { code } = req.query;
  console.log('received LinkedIn:', code);

  try {
    console.log('request access token...');
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

    console.log('receivedaccess token:', accessToken);

    console.log('request user profile ');
    const profileRes = await axios.get(
      'https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName)',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
  );


    console.log('user profile detailes ', profileRes.data);
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
    

//save to DB
    const user = await User.findOne({ where: { linkedin_Id: linkedinId } });

if (!user) {
  user = await User.create({
    linkedin_Id: linkedinId,
    first_name: firstName,
    last_name: lastName,
    email,
    profile_picture: profilePicture,
    linkedin_url: linkedinUrl,
  });}


    // return data to user 
    res.json({
      id: user._id,
      firstName,
      lastName,
      email,
      profilePicture,
      linkedinUrl
    });
  } catch (err) {
    console.error('LinkedIn auth failed:', err.response?.data || err.message);
    res.status(500).json({ error: 'LinkedIn authentication failed' });
  }
});

module.exports = router;
