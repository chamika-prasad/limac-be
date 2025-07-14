import nodemailer from "nodemailer";

// Send Email
const contact = async (req, res) => {
  const { name, email, mobileNo, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_USE_TLS,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const htmlTemplate = `
  <h2>New Contact Form Submission</h2>
  <p><strong>Full Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Contact No:</strong> ${mobileNo}</p>
  <p><strong>Message:</strong><br/>${message}</p>
`;

    const mailOptions = {
      from: `"Limac Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "New Contact Form Submission",
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
        return res.status(400).json({
          success: false,
          message: "Error contact us",
          error: error.message,
        });
      }
      return res.status(200).json({
        success: true,
        message: "Message sent",
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error contact us",
      error: error.message,
    });
  }
};

export default {
  contact,
};
