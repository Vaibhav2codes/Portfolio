# Vaibhav Singh Portfolio

Full-stack portfolio application with a Next.js frontend and a Spring Boot backend. It includes a recruiter-facing site, a contact form backed by SMTP, GitHub activity widgets, and an admin flow for replacing the public resume.

## Structure

- `frontend/`: Next.js 14 + TypeScript UI
- `backend/`: Spring Boot 3.3 API for contact, resume, and health endpoints

The frontend proxies API traffic through Next.js rewrites, so browser requests stay on the frontend origin while the server forwards them to the backend.

## Features

- Single-page portfolio with hero, about, experience, projects, skills, achievements, GitHub activity, and contact sections
- Contact form that posts to the backend and sends mail through SMTP
- Public resume delivery from a direct Supabase public object URL
- Protected `/admin` page for replacing the resume PDF
- Health endpoint for uptime and deployment checks

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

## Routes

### Frontend

- `/`: portfolio homepage
- `/admin`: resume upload page

### Backend API

- `GET /api/health`
- `POST /api/contact`
- `GET /api/resume/metadata`
- `POST /api/resume/admin`

### Frontend Rewrites

Configured in `frontend/next.config.js`:

- `/api/health` -> backend `/api/health`
- `/api/contact` -> backend `/api/contact`
- `/api/resume/:path*` -> backend `/api/resume/:path*`

The frontend can also redirect legacy `/resume.pdf` requests directly to the public resume URL when `NEXT_PUBLIC_RESUME_URL` or the public Supabase resume variables are configured.

## Local Development

### Prerequisites

- Node.js 18+
- npm
- Java 21
- Maven 3.9+

### Backend

```bash
cd backend
mvn spring-boot:run
```

Runs on `http://localhost:8080` by default.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:3000` by default.

## Environment Variables

### Frontend

Set these in `frontend/.env.local` when needed:

- `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- `NEXT_PUBLIC_API_BASE_URL=http://localhost:8080`
- `BACKEND_INTERNAL_URL=`
- `NEXT_PUBLIC_RESUME_URL=https://your-project.supabase.co/storage/v1/object/public/portfolio-assets/Vaibhav_SDE_Resume.pdf`
- `NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co`
- `NEXT_PUBLIC_SUPABASE_BUCKET=portfolio-assets`
- `NEXT_PUBLIC_SUPABASE_OBJECT_PATH=Vaibhav_SDE_Resume.pdf`
- `NEXT_PUBLIC_RESUME_FILE_NAME=Vaibhav_SDE_Resume.pdf`

`BACKEND_INTERNAL_URL` is optional and is used first when the frontend needs a private backend address in deployment. If it is not set, the app falls back to `NEXT_PUBLIC_API_BASE_URL`, then `http://localhost:8080`.

For the resume link, either set `NEXT_PUBLIC_RESUME_URL` directly or provide the public Supabase URL, bucket, and object path so the frontend can build the public file URL.

### Backend

Set these in `backend/.env` or your runtime environment:

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
- `SUPABASE_OBJECT_PATH=Vaibhav_SDE_Resume.pdf`

## Resume Flow

- Public visitors download the resume directly from the public Supabase object URL
- The backend resolves the current public resume asset and redirects to it
- The admin page uploads a new PDF with multipart form data
- The backend validates file size and admin password before replacing the stored file

## Checks

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

## Deployment Notes

- Set `FRONTEND_URL` on the backend to the deployed frontend origin
- Set `NEXT_PUBLIC_SITE_URL` on the frontend to the deployed public URL
- Use `BACKEND_INTERNAL_URL` only if your host provides a private backend address for server-to-server calls
- Set `SUPABASE_OBJECT_PATH=Vaibhav_SDE_Resume.pdf` on the backend
- Set `NEXT_PUBLIC_RESUME_URL` or the public Supabase resume variables on the frontend
- Resume files are expected to be managed through the backend and Supabase, not from `frontend/public`
- The homepage performs a best-effort background call to `/api/health` after idle or first interaction to reduce contact/admin cold-start delays on Render

## Notes

- `frontend/tsconfig.tsbuildinfo` is a generated file and should stay untracked
- `backend/uploads/` is a local artifact and should stay untracked
