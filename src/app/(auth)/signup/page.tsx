"use client"

import { useState } from "react";
import Link from "next/link";
import Tabs from "@/components/ui/auth/tabs";
import InputField from "@/components/ui/inputField";
import OAuthButtons from "@/components/ui/auth/oAuthButtons";
import Divider from "@/components/ui/auth/divider";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const data = await response.json();
      setSuccessMessage("Registration successful! Please log in.");
      console.log("User data:", data);
      setError(""); // Очистка ошибки при успешной регистрации
    } catch (err) {
      if (err instanceof Error) {
        console.error("Registration error:", err.message);
        setError("Registration failed. Please try again.");
      } else {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="signup-window" style={{ minHeight: "800px" }}>
      <div className="signup-area">
        <Tabs active="signup" />
        <div className="placeholder-form">
          <InputField
            type="email"
            label="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <InputField
            type="password"
            label="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <InputField
            type="password"
            label="Confirm password"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
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
        </div>
        <button className="button" onClick={handleSignUp}>
          <div className="text-wrapper">Sign Up</div>
        </button>
        <OAuthButtons />
      </div>
    </div>
  );
};

export default SignUp;
