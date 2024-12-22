import Link from "next/link";
import Image from "next/image";
import facebookLogo from "@/../public/facebook.png";
import googleLogo from "@/../public/google.png";
import Divider from "./divider";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function OAuthButtons() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || "/profile"

  return (
    <div className="oauth-container">
      <Divider />
      <button
        onClick={() => signIn("google", { callbackUrl })}
        className="oauth-button"
      >
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
