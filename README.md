# Ingenium Backend Website

A secure, scalable Node.js backend service for the Ingenium website. Handles contact form submissions with email notifications, rate limiting, and comprehensive error handling.

## Features

- ✅ **Contact Form API** - Receive and process contact form submissions
- ✅ **Service Request API** - Receive and process service request submissions
- 🔒 **Spam protection** handled via rate limiting and validation (reCAPTCHA removed)
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
- (no special API keys required)

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

This project requires a `.env` file with sensitive configuration values (database URI, SMTP credentials, etc.). For security reasons the README does not include environment variable values.

- Create a `.env` in the project root and populate it with the variables your deployment requires.
- Do not commit `.env` to source control. Keep secrets in a secure store (Vault, GitHub Secrets, AWS Secrets Manager, etc.).
- If your team uses a template, provide a `.env.example` with placeholder names only (no real secrets).

If you need to find the exact variable names used by the application, check the source files (for example `src/database/connection.js`, `src/services/email.services.js`, and `src/controllers/contact.controller.js`). This code no longer uses any reCAPTCHA-related variables.

Recommended checklist for configuration:

- Use TLS for SMTP (verify `SMTP_PORT` and `secure` settings with your provider).
- Ensure configuration values are set and not exposed in URLs or logs.
- Set `CLIENT_URL` to your frontend origin to restrict CORS.
- Use `NODE_ENV=production` in production to enable appropriate logging and security behavior.

## Project Structure

```
src/
├── app.js
├── server.js
├── controllers/
│   ├── contact.controller.js
│   └── requestService.controller.js
├── database/
│   └── connection.js
├── middleware/
│   ├── rateLimiter.js
│   └── validate.js
├── models/
│   ├── contact.model.js
│   └── requestService.js
├── routes/
│   ├── contact.routes.js
│   └── requestService.routes.js
├── services/
│   ├── contact.services.js
│   ├── email.services.js
│   └── requestService.services.js
└── validations/
    ├── contact.validation.js
    └── requestService.validation.js
```

## API Docs (Swagger/OpenAPI)

Interactive Swagger UI and the raw OpenAPI spec are available when the server is running:

- `GET /api/docs` - Swagger UI
- `GET /api/docs/openapi.yaml` - OpenAPI specification

## API Endpoints

### Submit Contact Form

**POST** `/api/contact`

Submit a contact form.

#### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "message": "I'm interested in learning more about your services."
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

If the contact record is saved but email delivery fails, the API still returns `201` with:
- `message`: `"Message saved, but email delivery failed"`
- `emailWarnings`: available in non-production environments only

#### Response (Error)
```json
{
  "error": "Validation error or server error message"
}
```

### Submit Service Request

**POST** `/api/request-service`

Submit a service request.

#### Request Body
```json
{
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "serviceType": "Web development"
}
```

#### Response (Success)
```json
{
  "success": true,
  "message": "Request received",
  "requestService": {
    "_id": "60d5ec49c1234567890abce0",
    "fullName": "Jane Smith",
    "email": "jane@example.com",
    "serviceType": "Web development",
    "ipAddress": "192.168.1.1",
    "createdAt": "2025-02-23T10:30:00.000Z"
  }
}
```

If the record is saved but email delivery fails, the API still returns `201` with:
- `message`: `"Request saved, but email delivery failed"`
- `emailWarnings`: available in non-production environments only

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
- (removed reCAPTCHA integration)
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

- **400** - Validation errors
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
