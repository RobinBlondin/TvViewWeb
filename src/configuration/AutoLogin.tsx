import { useEffect, useState } from "react";
import { googleLogout } from "@react-oauth/google";
import LoginFailed from "../components/LoginFailed/LoginFailed";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const REDIRECT_URI = import.meta.env.VITE_GOOGLE_CLIENT_REDIRECT_URI;
const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
const TOKEN = import.meta.env.VITE_JWT_TOKEN

const AutoLogin: React.FC<{ isTvView: boolean, initialPath: string }> = ({ isTvView, initialPath }) => {
  const [loginFailed, setLoginFailed] = useState(false);

  const cleanAuthState = () => {
    googleLogout();
    localStorage.removeItem(TOKEN);
    sessionStorage.clear();
  };

  const initiateLogin = () => {
    cleanAuthState();
    
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.append("client_id", GOOGLE_CLIENT_ID);
    authUrl.searchParams.append("redirect_uri", REDIRECT_URI);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("scope", "openid profile email https://www.googleapis.com/auth/calendar");
    authUrl.searchParams.append("access_type", "offline");
    authUrl.searchParams.append("prompt", "consent");
    
    window.location.href = authUrl.toString();
  };

  const exchangeCodeForToken = async (code: string) => {
    try {
      console.log("Exchanging code for token...");
      const response = await fetch(`${BASE_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code,
          clientId: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          isTvView: isTvView,
          redirectUri: REDIRECT_URI
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Token exchange successful");

      if (isTvView && data.tv_token) {
        localStorage.setItem(TOKEN, data.tv_token);
      } else if (data.id_token) {
        localStorage.setItem(TOKEN, data.id_token);
      }

      console.log("storage path", localStorage.getItem("initialPath"))

      window.history.replaceState({}, "", window.location.pathname);
      window.location.href = localStorage.getItem("initialPath") || "/";
      
      localStorage.removeItem("initialPath")
      

    } catch (error) {
      console.error("Token exchange failed:", error);
      setLoginFailed(true);
    }
  };

  useEffect(() => {
    localStorage.removeItem("preLoginPath")
    if(localStorage.getItem("loginProcessStarted")) {
      return;
    }

    if(!localStorage.getItem("initialPath")) {
      localStorage.setItem("initialPath", initialPath)
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const error = urlParams.get("error");
  
    if (error) {
      console.error("OAuth error:", error);
      setLoginFailed(true);
      return;
    }
  
    if (code) {
      localStorage.setItem("loginProcessStarted", "true")
      exchangeCodeForToken(code).finally(() => localStorage.removeItem("loginProcessStarted"))
    } else {
      console.log("Initiating Google login...");
      initiateLogin();
    }
  }, []);

  if (loginFailed) return <LoginFailed />;
  return <div>Redirecting to Google login...</div>;
};

export default AutoLogin;
