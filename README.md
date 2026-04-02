# Vandoora EC

Vandoora EC is a full-stack e-commerce application with user authentication, product management, cart functionality, and email verification. It uses React + Vite + Tailwind for the frontend and Node.js + Express + MongoDB for the backend.

## ✅ Features

- User registration and login with JWT authentication
- Email verification flow (OTP) for account validation
- Product listing, search, and product details
- Add-to-cart and cart management
- Responsive modern UI with dark/light theme toggle
- Redux slices for user and cart state management

## 📁 Repository Structure

- `backend/`: Express API server
  - `controllers/`: route logic
  - `models/`: MongoDB schemas
  - `routes/`: endpoints for user and product
  - `middleware/`: authentication middleware
  - `database/db.js`: MongoDB connection
  - `emailVerify/`: email OTP send/verify logic

- `frontend/`: React + Vite SPA
  - `src/pages/`: application page views (Home, Shop, Cart, etc.)
  - `src/components/`: re-usable UI and layout components
  - `src/redux/`: `cartSlice`, `userSlice`, store config
  - `src/config/api.js`: API URL and service helpers

## 🚀 Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

## ⚙️ Backend Setup

1. Open terminal and go to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up `.env` (example values):

```
MONGO_URL=<your-mongo-connection-string>
JWT_SECRET=<your-jwt-secret>
EMAIL_USER=<your-smtp-email>
EMAIL_PASS=<your-smtp-password>
```

4. Run backend server:

```bash
npm start
```

Default: `http://localhost:5000` (or as configured in `server.js`)

## 🎨 Frontend Setup

1. Open another terminal and go to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run development server:

```bash
npm run dev
```

Default: `http://localhost:5173`

## 🔗 Connect Frontend to Backend

- Update `frontend/src/config/api.js` to use correct backend URL (e.g. `http://localhost:5000`).

## 🧪 Available Scripts

### Backend

- `npm start`: starts backend with `nodemon`

### Frontend

- `npm run dev`: starts Vite dev server
- `npm run build`: builds production assets
- `npm run preview`: preview built app
- `npm run lint`: run ESLint

## 🛠️ Notes

- Ensure backend is running before performing login/signup operations.
- If using email verification, configure valid SMTP credentials.
- For production, secure environment secrets and set CORS/origin on backend accordingly.

## 📦 Deployment

1. Build frontend: `cd frontend && npm run build`
2. Serve static build through your preferred host or via custom Node server.
3. Deploy backend to any Node-compatible host and set environment variables.

## 🤝 Contribution

Feel free to open issues or pull requests to improve functionality, add tests, or enhance UI/UX.

---

_Generated README for Vandoora EC project._
