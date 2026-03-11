import RequestService from "../models/requestService.js";
import { sendEmail } from "./email.services.js";
import escape from "html-escape";

/**
 * Save service request and send notification email
 * @param {Object} data - service request data
 * @param {string} ipAddress - user's IP
 */
export const handleRequestService = async (data, ipAddress) => {
  const requestService = await RequestService.create({ ...data, ipAddress });

  const results = await Promise.allSettled([
    // Send notification email to admin
    sendEmail({
      to: process.env.SMTP_USER,
      subject: "New Service Request",
      html: `
        <h3>New Service Request</h3>
        <p><strong>Name:</strong> ${escape(requestService.fullName)}</p>
        <p><strong>Email:</strong> ${escape(requestService.email)}</p>
        <p><strong>Service Type:</strong> ${escape(requestService.serviceType)}</p>
        <p><strong>IP:</strong> ${requestService.ipAddress}</p>
      `
    }),
    // Send confirmation email to user
    sendEmail({
      to: requestService.email,
      subject: "We have received your service request",
      html: `<p>Hi ${escape(requestService.fullName)},</p>
             <p>Thank you for your request. We will get back to you shortly.</p>`
    })
  ]);

  const emailWarnings = results
    .filter((result) => result.status === "rejected")
    .map((result) => result.reason?.message || "Email send failed");

  return { requestService, emailWarnings };
};
