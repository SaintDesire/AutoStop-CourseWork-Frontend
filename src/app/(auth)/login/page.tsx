"use client"

import { FormEventHandler, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Tabs from "@/components/ui/auth/tabs";
import InputField from "@/components/ui/inputField";
import OAuthButtons from "@/components/ui/auth/oAuthButtons";
import Divider from "@/components/ui/auth/divider";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { signIn } from "next-auth/react";

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || "/profile"

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false
    });

    if (res && !res.error) {
      router.push(DASHBOARD_PAGES.PROFILE)
    } else {
      setError("Invalid login credentials. Please try again.");
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
