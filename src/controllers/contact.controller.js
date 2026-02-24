import { handleContactForm } from "../services/contact.services.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, company, message } = req.body;
    const ip = req.ip;

    const { contact, emailWarnings } = await handleContactForm(
      { name, email, company, message },
      ip
    );

    const response = {
      success: true,
      message:
        emailWarnings.length > 0
          ? "Message saved, but email delivery failed"
          : "Message sent",
      contact
    };

    if (emailWarnings.length > 0 && process.env.NODE_ENV !== "production") {
      response.emailWarnings = emailWarnings;
    }

    res.status(201).json({
      ...response
    });
  } catch (error) {
    console.error("Contact form error:", error.message);
    res.status(500).json({
      error: "Failed to process request",
      ...(process.env.NODE_ENV !== "production" && { details: error.message })
    });
  }
};
