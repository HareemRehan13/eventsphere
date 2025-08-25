# EventSphere Management – Backend (API)

## 1) Introduction
EventSphere streamlines expo & trade-show management for organizers, exhibitors, and attendees.
It replaces fragmented, manual workflows with a single API-first platform featuring role-based
access, booth allocation, session scheduling, registration, search, messaging, and basic analytics.

## 2) Objectives
- Provide a robust, modular backend that matches the eProject brief.
- Ship secure auth (JWT), role-based access, and clean REST endpoints.
- Make it easy to plug into any React frontend by simply fetching JSON.
- Keep the stack simple: Express + MongoDB (Mongoose).

## 3) Problem Statement
Traditional expo systems suffer from manual registrations, scattered communications, no real-time
updates, and poor discoverability. EventSphere solves this with a unified API offering: auth,
expo/booth/session management, exhibitor applications & approvals, attendee tools, messaging,
and analytics.

## 4) Hardware / Software Requirements
**Hardware**: Any modern machine that can run Node.js and MongoDB.
**Software**: Node 18+, MongoDB 6+, npm, Windows/macOS/Linux.  
(Your original brief listed legacy specs; this repo targets modern tooling.)

---

## Quick Start
1. Copy `.env.example` to `.env` and adjust values.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run MongoDB locally or point `MONGO_URI` to your cluster.
4. Start the server:
   ```bash
   npm run dev
   ```
5. API base URL: `http://localhost:${PORT}/api`

## Roles
- `Admin` – full access
- `Organizer` – manage expos/booths/sessions they own, approve/reject applications
- `Exhibitor` – apply, manage profile, reserve booths (when allowed)
- `Attendee` – register, browse, bookmark sessions

## Postman Collection
Import `docs/EventSphere.postman.json` to try endpoints quickly.

## Testing Notes
- This scaffold includes validation, error handling, and clean separation (models/routes/middleware).
- Add e2e tests later with Jest or Vitest + Supertest as you grow.

## Security
- Passwords hashed with bcrypt.
- JWT-based auth with expiry.
- Helmet + CORS enabled.
- Basic rate-limiting can be added (see TODOs).

## Roadmap / TODO
- Payments for booth reservations.
- Real-time via WebSockets (SSE stub provided).
- Advanced analytics dashboard.
- File uploads (logos, documents) with cloud storage.
