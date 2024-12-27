// components/ui/auth/OAuthButtons.tsx

"use client";

import Image from "next/image";
import googleLogo from "@/../public/google.png";
import Divider from "./divider";
import { useSearchParams } from "next/navigation";


export default function OAuthButtons() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || "/profile";

  const handleGoogleLogin = () => {
    // Перенаправляем пользователя на серверный маршрут для инициации Google OAuth с callbackUrl
    window.location.href = `http://localhost:3001/api/auth/google?callbackUrl=${encodeURIComponent(callbackUrl)}`;
  };

  return (
    <div className="oauth-container">
      <Divider />
      <button onClick={handleGoogleLogin} className="oauth-button">
        <div className="oauth-content">
          <Image
            src={googleLogo}
            alt="google"
            className="oauth-icon"
            draggable="false"
          />
          <span className="oauth-text">Login with Google</span>
        </div>
      </button>
    </div>
  );
}
