import express from "express";
import { contactValidationSchema } from "../validations/contact.validation.js";
import { validateRequest } from "../middleware/validate.js";
import { contactRateLimiter } from "../middleware/rateLimiter.js";
import { submitContactForm } from "../controllers/contact.controller.js";

const router = express.Router();

router.post(
  "/",
  contactRateLimiter,
  validateRequest(contactValidationSchema),
  submitContactForm
);

export default router;
