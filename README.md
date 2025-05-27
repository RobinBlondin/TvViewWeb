# TV View Frontend
A React 19 + TypeScript frontend built with Vite, designed to work with the companion TvViewApi backend: https://github.com/RobinBlondin/TvViewAPI.
The app handles Google OAuth2 authentication and displays calendar events, public transport info, bridge openings, weather data, and more.

It’s designed to run on a screen mounted in a family home, acting as a central hub for daily information.
Family members can:

 - See upcoming events synced with Google Calendar
 - View live local traffic, commute and weather updates
 - Upload reminders from their devices that can be checked off on-screen
 - Upload images from their devices that appear in a rotating slideshow on-screen

![image](https://github.com/user-attachments/assets/204e47a2-1538-49f7-91c7-66a22d1bfdb4)




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

### Google Cloud Console Setup (Frontend Configuration)

Before running the frontend application, you need to configure the Google Cloud Console project for OAuth2 authentication. This setup works in conjunction with the backend configuration.

#### 1. Ensure Google Cloud Project is Set Up

If you haven't already set up the Google Cloud project for the backend, follow these steps:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Google Calendar API
   - Google+ API (for profile information)

#### 2. Configure OAuth2 Consent Screen (if not done)

1. Navigate to **APIs & Services** > **OAuth consent screen**
2. Choose **External** user type (unless you're using Google Workspace)
3. Fill in the required information:
   - App name: `TV View Web`
   - User support email: Your email
   - Developer contact information: Your email
4. Add scopes:
   - `openid`
   - `profile`
   - `email`
   - `https://www.googleapis.com/auth/calendar`
5. Add test users (your email addresses that will use the app)

#### 3. Create Frontend OAuth2 Credentials

1. Navigate to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client IDs**
3. Choose **Web application** as the application type
4. Configure for the frontend:
   - Name: `TV View Frontend`
   - Authorized JavaScript origins:
     ```
     http://localhost:5173
     https://your_domain (Optional)
     ```
   - Authorized redirect URIs (adjust ports as needed):
     ```
     http://localhost:5173
     http://localhost:5173/auth/google
     http://localhost:5173/slides
     http://localhost:5173/reminders
     https://your_domain (Optional)
     https://your_domain/auth/google (Optional)
     https://your_domain/slides (Optional)
     https://your_domain/reminders (Optional)
     ```

5. Download the JSON credentials - you'll need the `client_id` and `client_secret` for your `.env` file

**Note:** The frontend uses a different OAuth2 client than the backend. Make sure to create separate credentials for each or use the same credentials with properly configured origins and redirect URIs for both applications.

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

Used for real-time updates like reminders, slide images and calendar events.

---

## Notes

- This frontend is tightly coupled with the TV View API backend. Be sure to run both simultaneously for full functionality.
- Authentication tokens are stored using localStorage.
- Add UI framework or CSS styling notes here if needed (e.g., Tailwind, MUI, etc.).
