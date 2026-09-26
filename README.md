# CGC Student Complaint Portal

Angular student portal with an Express REST API, MongoDB persistence, and JWT authentication. Students can register, sign in, submit campus complaints with image attachments, search/track their own complaints, and manage account details.

## Stack and layout

- `website/` — Angular 22 NgModule frontend
- `backend/src/` — Express application, routes, controllers, services, middleware, Mongoose models, and MongoDB connection
- `backend/uploads/complaints/` — local complaint image storage (excluded from Git)

## Requirements

Install Node.js/npm and run MongoDB locally, or provide a MongoDB Atlas connection string. The backend uses port 5000 by default and the Angular dev server uses port 4200.

## Configure and run the backend

From the repository root:

```powershell
cd backend
npm.cmd install
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
```

Edit `backend/.env`: set `MONGODB_URI` to your MongoDB connection string and replace `JWT_SECRET` with a random value of at least 32 characters. Keep `.env` private. Then start the API:

```powershell
npm.cmd run dev
```

After MongoDB connects, the API listens on `http://localhost:5000`; `GET /api/health` returns a basic health response.

## Run the Angular frontend

In another terminal, from the repository root:

```powershell
cd website
npm.cmd install
npm.cmd start
```

Open `http://localhost:4200`. The frontend API base URL is currently `http://localhost:5000/api` in `website/src/app/services/api.ts`; change it there if the backend is hosted elsewhere. Add that origin to `CLIENT_URL` in the backend environment.

## Environment variables

`PORT` sets the API port; `MONGODB_URI` points to MongoDB; `JWT_SECRET` signs tokens; `JWT_EXPIRES_IN` and `JWT_COOKIE_MAX_AGE_MS` control token and cookie lifetime; `CLIENT_URL` lists allowed frontend origins; `NODE_ENV` controls production cookie security.

## API endpoints

| Method | Endpoint | Authentication | Purpose |
| --- | --- | --- | --- |
| GET | `/api/health` | No | API health |
| POST | `/api/auth/register` | No | Create student account |
| POST | `/api/auth/login` | No | Authenticate and return JWT |
| GET | `/api/auth/me` | Yes | Get signed-in student profile |
| PATCH | `/api/auth/me` | Yes | Update profile fields |
| PATCH | `/api/auth/password` | Yes | Change password |
| POST | `/api/auth/logout` | Yes | Clear the browser authentication cookie |
| GET | `/api/dashboard` | Yes | Per-student complaint counts and recent activity |
| POST | `/api/complaints` | Yes | Submit a complaint (`multipart/form-data`, optional `attachments`) |
| GET | `/api/complaints/mycmp` | Yes | List own complaints (`search`, `status`, `page`, `limit`) |
| GET | `/api/complaints/track/:id` | Yes | Track own complaint by document ID or complaint reference |
| GET | `/api/complaints/track/:id/attachments/:file` | Yes | Download own complaint attachment |
| POST | `/api/complaints/:id/feedback` | Yes | Submit one 1–5 rating for a resolved complaint |

The browser receives the JWT in an HttpOnly, SameSite=Strict cookie and sends it with API requests; page scripts cannot read it. Production cookies are Secure. The API also accepts `Authorization: Bearer <token>` for non-browser clients. Browser logout clears its cookie; bearer tokens are stateless and remain valid until expiry.

## Models

- **User** — name, email, hashed password, student ID, optional phone, department, year, semester, role, timestamps
- **Complaint** — generated complaint reference, owner, category, subject, description, location, priority, preferred contact method, status, attachments, resolution, optional feedback, timestamps

## Security and behavior

Passwords are hashed with bcrypt. The API applies Helmet, explicit CORS origins, origin checks on state-changing requests, JSON size limits, general and authentication rate limits, input/schema validation, ownership checks, and centralized safe error responses. Complaint attachments are limited to five images of 5 MB each and are only downloadable by their owner. Configure HTTPS and a strong private JWT secret in deployed environments.

## Troubleshooting

- `MONGODB_URI is required` or connection timeout: check `backend/.env` and ensure MongoDB is running/reachable.
- CORS error: include the frontend origin (usually `http://localhost:4200`) in `CLIENT_URL`.
- Login redirects back to the portal: check that the frontend and backend use the same host name and that the frontend origin is listed in `CLIENT_URL`, then sign in again.
- Image rejected: use JPEG, PNG, GIF, or WebP under 5 MB.

## Verification

The Angular production build passed, and all 11 Angular unit tests passed. API smoke checks passed for health, authentication cookies, protected profile access, origin rejection, input validation, logout, and rate limiting. Database-backed registration and complaint persistence flows require MongoDB, which is not installed or running in this workspace, so those flows remain unverified here.
"# CGC-maintainence" 
