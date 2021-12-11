const nodemailer = require('nodemailer');
const { google } = require('googleapis');
// eslint-disable-next-line consistent-return
module.exports = async (email, subject, text) => {
  const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URI);
  oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
      },
    });
    await transporter.sendMail({
      from:'SIM-U',
      to:email,
      subject,
      generateTextFromHTML: true,
      html: text
      
    });
    console.log('Email berhasil dikirim');
  } catch (err) {
    console.log(err);
  }
};
