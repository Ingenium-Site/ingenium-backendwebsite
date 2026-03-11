import { handleRequestService } from "../services/requestService.services.js";

export const submitRequestService = async (req, res) => {
  try {
    const { fullName, email, serviceType } = req.body;
    const ip = req.ip;

    const { requestService, emailWarnings } = await handleRequestService(
      { fullName, email, serviceType },
      ip
    );

    const response = {
      success: true,
      message:
        emailWarnings.length > 0
          ? "Request saved, but email delivery failed"
          : "Request received",
      requestService
    };

    if (emailWarnings.length > 0 && process.env.NODE_ENV !== "production") {
      response.emailWarnings = emailWarnings;
    }

    res.status(201).json({
      ...response
    });
  } catch (error) {
    console.error("Request service error:", error.message);
    res.status(500).json({
      error: "Failed to process request",
      ...(process.env.NODE_ENV !== "production" && { details: error.message })
    });
  }
};
