const nodemailer = require('nodemailer');

// eslint-disable-next-line consistent-return
module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASS_GMAIL,
      },
      tls: {
        rejectUnauthorized: false,
      },

    });
    await transporter.sendMail({
      from: process.env.GMAIL,
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
