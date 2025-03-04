import React, { useEffect, useState, useCallback } from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";

const TOKEN_STORAGE_KEY = "googleToken";

const AutoLogin: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_STORAGE_KEY));

  const login = useGoogleLogin({
    flow: "auth-code",
    ux_mode: "redirect",
    redirect_uri: window.location.origin,
    onSuccess: (tokenResponse) => {
      console.log("User Logged In:", tokenResponse);
      const newToken = tokenResponse.code;
      localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
      setToken(newToken);
      window.location.href = "/"; 
    },
    onError: () => {
      console.error("Google Login Failed");
    },
  });

  const handleLogin = useCallback(() => {
    console.log("Checking login...");
    if (!token) {
      console.log("Triggering Google Login");
      login();
    }
  }, [token, login]);

  useEffect(() => {
    handleLogin();
  }, [handleLogin]);

 
  useEffect(() => {
    if (!token) return;

    const refreshInterval = setInterval(() => {
      console.log("Refreshing token...");
      googleLogout();
      login();
    }, 50 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [token, login]);

  return <div>{token ? "Logged In" : "Logging in..."}</div>;
};

export default AutoLogin;
