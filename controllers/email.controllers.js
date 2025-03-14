require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendEmail = async (req, res) => {
    try {
        const { to, subject, message } = req.body;

        if (!to || !subject || !message) {
            return res.status(400).json({ message: "Please provide to, subject, and message." });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: message,
        };

        await transporter.sendMail(mailOptions);
        console.log("📩 Email sent successfully to:", to);
        res.status(200).json({ message: `Email sent to ${to}` });
    } catch (error) {
        console.error("❌ Error sending email:", error);
        res.status(500).json({ message: "Failed to send email", error });
    }
};
