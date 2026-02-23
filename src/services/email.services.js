import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

/**
 * Send an email
 * @param {Object} options - { to, subject, html }
 */
export const sendEmail = async (options) => {
  await transporter.sendMail({
    from: `"Ingenium Website" <${process.env.SMTP_USER}>`,
    ...options
  });
};