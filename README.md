# Assets Server

Express + MongoDB API for the Assets & Service Ticket Management app.

## Tech Stack

- Node.js
- Express 5
- MongoDB with Mongoose
- JWT access and refresh tokens
- HTTP-only cookie authentication
- Role and permission-based access control

## Local Setup

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/assets-db
JWT_SECRET=replace-with-local-secret
REFRESH_TOKEN_SECRET=replace-with-local-refresh-secret
CORS_ORIGIN=http://localhost:3000
COOKIE_DOMAIN=
```

Start the API:

```bash
npm run dev
```

Health check:

```txt
http://localhost:3001/api/v1/health
```

## Scripts

```bash
npm run dev      # Start API with tsx watch
npm run build    # Compile TypeScript to dist
npm run start    # Run compiled dist/app.js
npm run seed     # Wipe and seed database data
```

`npm run seed` deletes and recreates roles, users, assets, tickets, menus, audit logs, and notifications.

## Environment Variables

| Variable | Required | Description |
|---|---:|---|
| `NODE_ENV` | Yes | Use `development` locally and `production` in Render. |
| `PORT` | Local only | Local API port. Render supplies `PORT` automatically. |
| `MONGODB_URI` | Yes | MongoDB connection string. |
| `JWT_SECRET` | Yes | Secret used to sign access tokens. Use a long random value. |
| `REFRESH_TOKEN_SECRET` | Yes | Secret used to sign refresh tokens. Use a different long random value. |
| `CORS_ORIGIN` | Yes | Frontend origin allowed to call the API. |
| `COOKIE_DOMAIN` | Optional | Leave blank for Render/Netlify default domains. Use `.yourdomain.com` only for shared custom subdomains. |

Generate production secrets:

```bash
openssl rand -hex 32
openssl rand -hex 32
```

Use one value for `JWT_SECRET` and the other for `REFRESH_TOKEN_SECRET`.

## Authentication And Cookies

The API sets `accessToken` and `refreshToken` as HTTP-only cookies.

Development cookie behavior:

```txt
Secure=false
SameSite=Lax
```

Production cookie behavior:

```txt
Secure=true
SameSite=None
```

This supports deployments where the frontend and backend are on separate domains, such as Netlify and Render.

## Deployment: Render

Recommended Render settings:

```txt
Root directory: assets-server
Build command: npm install
Start command: npm run dev
```

If the backend TypeScript errors are fixed, prefer:

```txt
Build command: npm install && npm run build
Start command: npm run start
```

Render environment variables:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<long-random-secret>
REFRESH_TOKEN_SECRET=<different-long-random-secret>
CORS_ORIGIN=https://your-netlify-site.netlify.app
COOKIE_DOMAIN=
```

Do not set `PORT` on Render unless you have a specific reason; Render injects it.

## Main API Areas

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `GET /api/v1/auth/me`
- `/api/v1/assets`
- `/api/v1/tickets`
- `/api/v1/users`
- `/api/v1/roles`
- `/api/v1/audit-logs`
- `/api/v1/notifications`

## Seeded Demo Users

The seed script creates users for Admin, Technician, Employee, and Auditor roles. Passwords are set in the seed file.

