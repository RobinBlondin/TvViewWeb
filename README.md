# TV View Frontend
A React 19 + TypeScript frontend built with Vite, designed to work with the companion TvViewApi backend: https://github.com/RobinBlondin/TvViewAPI.
The app handles Google OAuth2 authentication and displays calendar events, public transport info, bridge openings, weather data, and more.

It’s designed to run on a screen mounted in a family home, acting as a central hub for daily information.
Family members can:

 - See upcoming events synced with Google Calendar
 - View live local traffic, commute and weather updates
 - Upload reminders from their devices that can be checked off on-screen
 - Upload images from their devices that appear in a rotating slideshow on-screen


##  Technologies Used

- React 19
- Vite 6.2.0
- TypeScript 5.7.2
- Google OAuth2
- WebSockets
- REST API integration with Spring Boot backend

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A running instance of the TV View API backend
- `.env` file in your project root (see below)

---

## Environment Variables

Create a `.env` file in the root of your project:

#### `.env.example`

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret
VITE_GOOGLE_ACCESS_TOKEN_STORAGE_KEY=googleAccessToken

VITE_API_BASE_URL=http://localhost:8080 or other if backend is set up differently
VITE_BASE_URL=http://localhost:5173
VITE_GOOGLE_CLIENT_REDIRECT_URI=http://localhost:5173 or other if other is set at Google cloud console.

VITE_JWT_TOKEN=token
VITE_WS_URL=ws://localhost:8080/ws or other if backend is set up differently
```

## Installation & Run

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

The app should now be running at:  
**http://localhost:5173**

---

## Authentication Flow

- The frontend handles **Google OAuth2 login** using the Google authorization flow.
- After login, it retrieves the **authorization code** and sends it to the backend `/auth/google` endpoint.
- The backend exchanges the code for a Google ID token and a **custom JWT token (`tv_token`)**, which is then stored and used for authenticated API requests.

---

## WebSocket Support

This project connects to a WebSocket server at:

```
VITE_WS_URL=ws://localhost:8080/ws
```

Used for real-time updates like reminders and slide images.

---

## Notes

- This frontend is tightly coupled with the TV View API backend. Be sure to run both simultaneously for full functionality.
- Authentication tokens are stored using localStorage.
- Add UI framework or CSS styling notes here if needed (e.g., Tailwind, MUI, etc.).
