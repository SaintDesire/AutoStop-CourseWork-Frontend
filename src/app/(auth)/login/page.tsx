"use client";

import { useContext, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Tabs from "@/components/ui/auth/tabs";
import InputField from "@/components/ui/inputField";
import OAuthButtons from "@/components/ui/auth/oAuthButtons";
import { AuthContext } from '@/components/ui/authProvider';
import { DASHBOARD_PAGES } from "@/config/pages-url.config";

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

const Login: React.FC = () => {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || DASHBOARD_PAGES.PROFILE;

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Важно для отправки и получения cookies
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const { message } = await response.json();
        setError(message || "Login failed");
        return;
      }
  
      const data: LoginResponse = await response.json();
      setIsAuthenticated(true);
      setUser(data.user);
  
      // Перенаправляем пользователя на профиль или другую страницу
      router.push(callbackUrl);
    } catch (err) {
      console.error("Error during login:", err);
      setError("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="login-window" style={{ minHeight: "800px" }}>
      <div className="login-area">
        <Tabs active="signin" />
        <div className="placeholder-form">
          <InputField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "40px",
          }}
        >
          <div>
            <input type="checkbox" id="keep" />
            <label htmlFor="keep" style={{ marginLeft: "10px" }}>
              Keep me signed in
            </label>
          </div>
          <Link
            href="/"
            style={{ color: "#405FF2", textDecoration: "underline" }}
          >
            Lost your password?
          </Link>
        </div>
        <button className="button" onClick={handleLogin}>
          <div className="text-wrapper">Login</div>
        </button>
        <OAuthButtons />
      </div>
    </div>
  );
};

export default Login;
