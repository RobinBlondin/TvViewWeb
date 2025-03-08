import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import LoginFailed from "../components/LoginFailed/LoginFailed";

const ACCESS_TOKEN_KEY = import.meta.env.VITE_GOOGLE_ACCESS_TOKEN_STORAGE_KEY;
const ID_TOKEN_KEY = import.meta.env.VITE_GOOGLE_ID_TOKEN_STORAGE_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_GOOGLE_CLIENT_REDIRECT_URI;

const AutoLogin: React.FC = () => {
  

  const [token, setToken] = useState<string | null>(localStorage.getItem(ACCESS_TOKEN_KEY));
  const [loginFailed, setLoginFailed] = useState(false);
  const [trigger, setTrigger] = useState<boolean>(false);

  const login = useGoogleLogin({
    flow: "auth-code",
    ux_mode: "redirect",
    redirect_uri: REDIRECT_URI,
    scope: "openid email profile"
  });

  useEffect(() => {
    if (token) return;

    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");

    if (authCode) {
      console.log("✅ Found authorization code in URL:", authCode);

      (async () => {
        try {
          const response = await fetch(`${BASE_URL}/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              code: authCode,
              clientId: GOOGLE_CLIENT_ID,
              clientSecret: GOOGLE_CLIENT_SECRET,
              redirectUri: REDIRECT_URI,
            }),
          });

          if (!response.ok) {
            console.error("Backend authentication failed");
            setLoginFailed(true);
            return;
          }

          const { access_token, id_token, name, email, picture } = await response.json();

          const googleUser = {
            name: name, 
            email: email,
            picture: picture
          }

          localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
          localStorage.setItem(ID_TOKEN_KEY, id_token);
          localStorage.setItem("googleUser", JSON.stringify(googleUser));

          setToken(access_token);

          window.history.replaceState({}, document.title, window.location.pathname);
          window.location.href = "/";
        } catch (error) {
          console.error("Error exchanging auth code:", error);
          setLoginFailed(true);
        }
      })();
    } else {
      console.log("Redirecting to Google Login...");
      login();
      setTrigger(!trigger);
    }
  }, [token, trigger]);

  if (loginFailed) return <LoginFailed />;

  return null;
};

export default AutoLogin;
