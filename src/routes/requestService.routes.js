import express from "express";
import { requestServiceValidationSchema } from "../validations/requestService.validation.js";
import { validateRequest } from "../middleware/validate.js";
import { contactRateLimiter } from "../middleware/rateLimiter.js";
import { submitRequestService } from "../controllers/requestService.controller.js";

const router = express.Router();

router.post(
  "/",
  contactRateLimiter,
  validateRequest(requestServiceValidationSchema),
  submitRequestService
);

export default router;
