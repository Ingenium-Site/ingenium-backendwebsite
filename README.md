# Ingenium Backend Website

A secure, scalable Node.js backend service for the Ingenium website. Handles contact form submissions with email notifications, reCAPTCHA verification, rate limiting, and comprehensive error handling.

## Features

- ✅ **Contact Form API** - Receive and process contact form submissions
- 🔒 **reCAPTCHA Integration** - Spam protection using Google reCAPTCHA
- 📧 **Email Notifications** - SMTP-based email notifications to admin and users
- ⏱️ **Rate Limiting** - Prevent abuse with intelligent rate limiting
- 🛡️ **Security Best Practices** - Helmet, CORS configuration, HTML escaping, secure error handling
- ✔️ **Input Validation** - Joi schema validation for all requests
- 📝 **Comprehensive Logging** - Error tracking and debugging support
- 🗄️ **MongoDB Integration** - Store contacts in MongoDB database

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- SMTP credentials (for email sending)
- Google reCAPTCHA API keys

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ingenium-Site/ingenium-backendwebsite.git
   cd ingenium-backendwebsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

## Configuration

This project requires a `.env` file with sensitive configuration values (database URI, SMTP credentials, reCAPTCHA secret, etc.). For security reasons the README does not include environment variable values.

- Create a `.env` in the project root and populate it with the variables your deployment requires.
- Do not commit `.env` to source control. Keep secrets in a secure store (Vault, GitHub Secrets, AWS Secrets Manager, etc.).
- If your team uses a template, provide a `.env.example` with placeholder names only (no real secrets).

If you need to find the exact variable names used by the application, check the source files (for example `src/database/connection.js`, `src/services/email.services.js`, and `src/controllers/contact.controller.js`).

Recommended checklist for configuration:

- Use TLS for SMTP (verify `SMTP_PORT` and `secure` settings with your provider).
- Ensure `RECAPTCHA_SECRET_KEY` (or the name used in your config) is set and not exposed in URLs or logs.
- Set `CLIENT_URL` to your frontend origin to restrict CORS.
- Use `NODE_ENV=production` in production to enable appropriate logging and security behavior.

## Project Structure

```
src/
├── app.js                      # Express app configuration
├── server.js                   # Server entry point
├── config/                     # Configuration files
│   ├── db.js                  # Database configuration
│   ├── email.js               # Email configuration
│   └── recapture.js           # reCAPTCHA configuration
├── controllers/               # Route handlers
│   └── contact.controller.js
├── database/                  # Database setup
│   └── connection.js
├── middleware/                # Custom middleware
│   ├── errorHandler.js
│   ├── rateLimiter.js
│   └── validate.js
├── models/                    # MongoDB schemas
│   └── contact.model.js
├── routes/                    # API routes
│   └── contact.routes.js
├── services/                  # Business logic
│   ├── contact.services.js
│   └── email.services.js
├── utils/                     # Utility functions
│   └── logger.js
└── validations/               # Validation schemas
    └── contact.validation.js
```

## API Endpoints

### Submit Contact Form

**POST** `/api/contact`

Submit a contact form with reCAPTCHA verification.

#### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "message": "I'm interested in learning more about your services.",
  "token": "recaptcha-token-from-client"
}
```

#### Response (Success)
```json
{
  "success": true,
  "message": "Message sent",
  "contact": {
    "_id": "60d5ec49c1234567890abcde",
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Corp",
    "message": "I'm interested in learning more about your services.",
    "ipAddress": "192.168.1.1",
    "createdAt": "2025-02-23T10:30:00.000Z"
  }
}
```

#### Response (Error)
```json
{
  "error": "Validation error or server error message"
}
```

## Security Features

- **XSS Protection**: HTML escaping in email templates
- **CORS**: Configured for specific client URL
- **Helmet**: HTTP headers security middleware
- **Rate Limiting**: Max 5 requests per IP per 10 minutes
- **Input Validation**: Schema validation with Joi
- **reCAPTCHA**: Server-side token verification
- **Secure Error Handling**: No sensitive data leakage in responses
- **Environment Variables**: Secure credential management

## Running the Application

### Development Mode
```bash
npm run dev
```
Runs with nodemon for auto-restart on file changes.

### Production Mode
```bash
npm start
```

## Error Handling

The application includes comprehensive error handling:

- **400** - Validation errors, spam detection
- **500** - Server errors (generic message sent to client, full error logged server-side)

## Contributing

1. Create a feature branch (`git checkout -b feature/your-feature`)
2. Commit changes (`git commit -am 'Add new feature'`)
3. Push to the branch (`git push origin feature/your-feature`)
4. Open a Pull Request

## License

ISC License - See LICENSE file for details

## Contact

For issues and questions, please visit: https://github.com/Ingenium-Site/ingenium-backendwebsite/issues

---

**Author**: Ezekiel Donkor
