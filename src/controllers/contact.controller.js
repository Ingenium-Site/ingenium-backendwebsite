import { handleContactForm } from "../services/contact.services.js";
import axios from "axios";

/**
 * Verify reCAPTCHA token
 */
const verifyRecaptcha = async (token, secret, ip) => {
  const url = "https://www.google.com/recaptcha/api/siteverify";
  const response = await axios.post(url, {
    secret,
    response: token,
    remoteip: ip
  });
  return response.data.success;
};

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message, token } = req.body;
    const ip = req.ip;

    // Verify reCAPTCHA with proper error handling
    const secret = process.env.RECAPTCHA_SECRET;
    if (!secret) {
      return res.status(500).json({ error: "Configuration error" });
    }
    
    const isHuman = await verifyRecaptcha(token, secret, ip);
    if (!isHuman) return res.status(400).json({ error: "Spam detected" });

    const contact = await handleContactForm({ name, email, message }, ip);

    res.status(201).json({ success: true, message: "Message sent", contact });
  } catch (error) {
    // Log error server-side without exposing details
    console.error("Contact form error:", error.message);
    res.status(500).json({ error: "Failed to process request" });
  }
};