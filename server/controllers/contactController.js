const nodemailer = require("nodemailer");
const ContactRequest = require("../models/ContactRequest"); // Optional: assuming you have a model for this
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // Use 'true' if your host requires a secure connection
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.createContactRequest = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      fullName,
      emailAddress,
      inquiryType,
      message,
    } = req.body;

    // Optional: Save the data to your database
    const newRequest = await ContactRequest.create({
      fullName,
      emailAddress,
      inquiryType,
      message,
    });

    // Create the email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER, // The recipient of the email
      subject: `New Contact Form Submission: ${inquiryType}`,
      text: `
        A new message has been submitted via the contact form.

        Full Name: ${fullName}
        Email: ${emailAddress}
        Inquiry Type: ${inquiryType}
        Message:
        ${message}
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond with a success message
    res.status(201).json({ success: true, message: "Contact request submitted successfully." });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ error: "Server error. Failed to send request." });
  }
};