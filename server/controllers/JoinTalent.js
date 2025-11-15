const JoinTalent = require("../models/JoinTalent");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.createRequest = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, location, anythingElse } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "File upload required" });
    }

    const newRequest = await JoinTalent.create({
      firstName,
      lastName,
      email,
      phone,
      location,
      anythingElse,
      fileUrl: req.file.path,
      originalFileName: req.file.originalname,
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      subject: "New JoinTalent Request Submission",
      text: `
New submission:
First Name: ${firstName}
Last Name: ${lastName}
Email: ${email}
Phone: ${phone}
Location: ${location}
Anything Else: ${anythingElse}
      `,
      attachments: [
        {
          filename: req.file.originalname,
          path: req.file.path,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: "Request submitted successfully" });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ error: "Server error" });
  }
};
