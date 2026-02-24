import nodemailer from "nodemailer";

const smtpPort = Number(process.env.SMTP_PORT) || 465;
const smtpSecure =
  typeof process.env.SMTP_SECURE === "string"
    ? process.env.SMTP_SECURE.toLowerCase() === "true"
    : smtpPort === 465;

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: smtpSecure,
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
    from: process.env.SMTP_FROM || `"Ingenium Website" <${process.env.SMTP_USER}>`,
    ...options
  });
};
