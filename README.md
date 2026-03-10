# Vaibhav Singh Portfolio

Full-stack developer portfolio for a backend software engineer.

## Stack

- Frontend: Next.js, Tailwind CSS, Framer Motion, React Icons
- Backend: Java 21, Spring Boot, Spring Mail

## Structure

- `frontend/` recruiter-focused portfolio UI
- `backend/` contact API for sending messages via SMTP

## Frontend setup

1. `cd frontend`
2. `npm install`
3. Copy `.env.example` to `.env.local`
4. `npm run dev`

Frontend environment:

- `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- `NEXT_PUBLIC_API_BASE_URL=http://localhost:8080`

## Backend setup

1. `cd backend`
2. Configure SMTP values in your shell or `.env`
3. `mvn spring-boot:run`

Backend environment:

- `SERVER_PORT=8080`
- `FRONTEND_URL=http://localhost:3000`
- `CONTACT_TO_EMAIL=vaibhav2112001@gmail.com`
- `CONTACT_FROM_EMAIL=portfolio@your-domain.com`
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_USERNAME=your-smtp-user`
- `SMTP_PASSWORD=your-smtp-password`
- `SMTP_PROPERTIES_MAIL_SMTP_AUTH=true`
- `SMTP_PROPERTIES_MAIL_SMTP_STARTTLS_ENABLE=true`

## Notes

- Replace `frontend/public/Vaibhav_Singh_Resume.txt` with the final resume PDF when available.
- The contact form posts to the Java backend and returns success or error status for the UI.
- For Vercel deployment, host the Spring Boot API separately and set `NEXT_PUBLIC_API_BASE_URL` to the deployed backend URL.
