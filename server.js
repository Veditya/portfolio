// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config(); // for environment variables

const app = express();

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  // Create transporter for sending email
  let transporter = nodemailer.createTransport({
    service: "gmail", // or use your preferred email service provider
    auth: {
      user: process.env.EMAIL_USER, // your email address
      pass: process.env.EMAIL_PASS, // your email password or app-specific password
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // where to send the email
    subject: `New message from ${name} ${email}`,
    text: message,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
