const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
require('dotenv').config();

exports.submitContact = async (req, res) => {
  try {
    console.log('Request received:', req.body);
    const { name, email, description } = req.body;

    if (!name || !email || !description) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const contact = new Contact({ name, email, description });
    await contact.save();
    console.log('Contact saved to database successfully');

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.OUTLOOK_EMAIL,
        pass: process.env.APP_PASSWORD,
      }
    });

    transporter.verify((error, success) => {
      if (error) {
        console.error('SMTP Connection Error:', error);
      } else {
        console.log('SMTP Connection Successful');
      }
    });

    // Email to user
    const userMailOptions = {
      from: {
        name: 'WealthNx',
        address: process.env.OUTLOOK_EMAIL,
      },
      to: email,
      subject: 'Thanks for joining the WealthNX Wishlist!',
      html: `
        <h3>Hi ${name},</h3>
        <p>Thank you for joining the WealthNX wishlist! We will keep you updated.</p>
        <p>Your message:</p>
        <blockquote>${description}</blockquote>
        <p>— INEXOR</p>
      `
    };

    // Email to admin
    const adminMailOptions = {
      from: process.env.OUTLOOK_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Wishlist Submission',
      html: `
        <h3>New Wishlist Submitted</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${description}</p>
        <p><em>Submitted on ${new Date().toLocaleString()}</em></p>
      `
    };

    const userEmailResult = await transporter.sendMail(userMailOptions);
    console.log('User email sent:', userEmailResult.messageId);

    const adminEmailResult = await transporter.sendMail(adminMailOptions);
    console.log('Admin email sent:', adminEmailResult.messageId);

    res.status(201).json({ message: 'Submitted and both emails sent successfully.' });

  } catch (error) {
    console.error('Email sending failed or Wishlist form error:', error);
    res.status(500).json({
      message: 'An error occurred while processing your request.',
      error: error.message,
    });
  }
};
