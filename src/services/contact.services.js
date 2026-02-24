import Contact from "../models/contact.model.js";
import { sendEmail } from "./email.services.js";
import escape from "html-escape";

/**
 * Save contact and send notification email
 * @param {Object} data - contact data
 * @param {string} ipAddress - user's IP
 */
export const handleContactForm = async (data, ipAddress) => {
  const contact = await Contact.create({ ...data, ipAddress });

  const results = await Promise.allSettled([
    // Send notification email to admin
    sendEmail({
      to: process.env.SMTP_USER, // admin email
      subject: "New Contact Form Submission",
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${escape(contact.name)}</p>
        <p><strong>Email:</strong> ${escape(contact.email)}</p>
        <p><strong>Message:</strong><br>${escape(contact.message)}</p>
        <p><strong>IP:</strong> ${contact.ipAddress}</p>
      `
    }),
    // Send confirmation email to user
    sendEmail({
      to: contact.email,
      subject: "We have received your message",
      html: `<p>Hi ${escape(contact.name)},</p>
             <p>Thank you for contacting ingenium. We will get back to you shortly.</p>`
    })
  ]);

  const emailWarnings = results
    .filter((result) => result.status === "rejected")
    .map((result) => result.reason?.message || "Email send failed");

  return { contact, emailWarnings };
};
