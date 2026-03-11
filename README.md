# Vaibhav Singh Portfolio

Full-stack portfolio application for a backend-focused software engineer. The repo contains a Next.js frontend, a Spring Boot backend, a recruiter-facing portfolio site, a contact workflow backed by SMTP, GitHub activity visualizations, and an admin flow for replacing the public resume PDF.

## Architecture

- `frontend/`: Next.js 14 + TypeScript portfolio UI
- `backend/`: Spring Boot 3.3 API for contact, resume, and health endpoints
- `render.yaml`: Render deployment blueprint for both services

The frontend proxies portfolio API traffic through Next.js rewrites, so the browser talks to the frontend origin while the frontend forwards to the backend.

## Features

- Responsive single-page portfolio with sections for hero, about, experience, projects, skills, achievements, GitHub activity, and contact
- Animated UI using Tailwind CSS and Framer Motion
- Dynamic GitHub activity dashboard with contribution heatmap, repo stats, language breakdown, and recent repositories
- Contact form that posts to the Spring Boot backend and sends email through SMTP
- Resume delivery through `/resume.pdf` backed by the backend
- Protected admin page at `/admin` for uploading a replacement resume PDF
- Health endpoint for deployment checks

## Tech Stack

### Frontend

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- `react-github-calendar`
- `next-themes`

### Backend

- Java 21
- Spring Boot 3.3
- Spring Web
- Spring Validation
- Spring Mail
- Maven
- `spring-dotenv`

## Application Routes

### Frontend

- `/`: portfolio homepage
- `/admin`: resume upload admin page

### Backend API

- `GET /api/health`: health check
- `POST /api/contact`: send contact email
- `GET /api/resume/metadata`: fetch resume metadata
- `GET /api/resume/file`: redirect to the public resume asset
- `POST /api/resume/admin`: upload and replace resume PDF

### Frontend Rewrites

Configured in `frontend/next.config.js`:

- `/api/contact` -> backend `/api/contact`
- `/api/resume/:path*` -> backend `/api/resume/:path*`
- `/resume.pdf` -> backend `/api/resume/file`

## Local Development

### Prerequisites

- Node.js 18+
- npm
- Java 21
- Maven 3.9+

### 1. Run the backend

```bash
cd backend
mvn spring-boot:run
```

Backend default URL: `http://localhost:8080`

### 2. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend default URL: `http://localhost:3000`

## Environment Variables

### Frontend

Set these in `frontend/.env.local` when needed:

- `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- `NEXT_PUBLIC_API_BASE_URL=http://localhost:8080`
- `BACKEND_INTERNAL_URL=` for internal service-to-service routing in deployment environments

`BACKEND_INTERNAL_URL` is used preferentially by Next.js rewrites when present. Otherwise the frontend falls back to `NEXT_PUBLIC_API_BASE_URL`, then `http://localhost:8080`.

### Backend

Set these in `backend/.env` or your shell:

- `PORT=8080`
- `SERVER_PORT=8080`
- `FRONTEND_URL=http://localhost:3000`
- `CONTACT_TO_EMAIL=vaibhav2112001@gmail.com`
- `CONTACT_FROM_EMAIL=no-reply@portfolio.local`
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_USERNAME=your-smtp-user`
- `SMTP_PASSWORD=your-smtp-password`
- `SMTP_PROPERTIES_MAIL_SMTP_AUTH=true`
- `SMTP_PROPERTIES_MAIL_SMTP_STARTTLS_ENABLE=true`
- `RESUME_ADMIN_PASSWORD=choose-a-strong-password`
- `RESUME_MAX_FILE_SIZE_BYTES=5242880`
- `RESUME_MULTIPART_MAX_FILE_SIZE=5MB`
- `RESUME_MULTIPART_MAX_REQUEST_SIZE=5MB`
- `SUPABASE_URL=your-supabase-project-url`
- `SUPABASE_SERVICE_ROLE_KEY=your-service-role-key`
- `SUPABASE_BUCKET=portfolio-assets`
- `SUPABASE_OBJECT_PATH=resume.pdf`

## Resume Flow

- Public resume downloads are served through `/resume.pdf`
- The backend resolves the current public resume location and redirects to the stored asset
- The admin page uploads a PDF to the backend using multipart form data
- The backend validates file size and admin password before replacing the stored resume

## Quality Checks

### Frontend

```bash
cd frontend
npm run lint
```

### Backend

```bash
cd backend
mvn test
```

## Deployment

`render.yaml` defines two Render services:

- `portfolio-backend`: Docker-based Spring Boot service with `/api/health` health check
- `portfolio-frontend`: Node-based Next.js service that talks to the backend through `BACKEND_INTERNAL_URL`

For production, configure the frontend public URL and backend CORS origin to match the deployed domain.

## Notes

- `frontend/tsconfig.tsbuildinfo` is a generated TypeScript build artifact and should usually stay untracked
- `backend/uploads/` is a local storage artifact if resume files are handled on disk during development
- `frontend/public/resume.pdf` is not required when the backend-managed resume flow is used
