import { handleContactForm } from "../services/contact.services.js";
import axios from "axios";

/**
 * Verify reCAPTCHA token
 */

const verifyRecaptcha = async (token, secret, ip) => {
  const url = "https://www.google.com/recaptcha/api/siteverify";

  const params = new URLSearchParams();
  params.append("secret", secret);
  params.append("response", token);
  params.append("remoteip", ip);

  const response = await axios.post(url, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  return response.data;
};

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message, token } = req.body;
    const ip = req.ip;

    if (!token) {
      return res.status(400).json({ error: "reCAPTCHA token is required" });
    }

    // Verify reCAPTCHA with proper error handling
    const secret = process.env.RECAPTURE_SECRET_KEY;
    if (!secret) {
      return res.status(500).json({ error: "Configuration error" });
    }
    
    const isHuman = await verifyRecaptcha(token, secret, ip);
    console.log("reCAPTCHA verification result:", isHuman);

    if (!isHuman.success) return res.status(400).json({ error: "Spam detected", details: isHuman["error-codes"] });

    const contact = await handleContactForm({ name, email, message }, ip);

    res.status(201).json({ success: true, message: "Message sent", contact });
  } catch (error) {
    // Log error server-side without exposing details
    console.error("Contact form error:", error.message);
    res.status(500).json({ error: "Failed to process request" });
  }
};