import Link from "next/link";
import Image from "next/image";
import facebookLogo from "@/../public/facebook.png";
import googleLogo from "@/../public/google.png";
import Divider from "./divider";

export default function OAuthButtons() {
  return (
    <div className="oauth-container">
      <Divider/>
      {/* Facebook Button */}
      <Link href="/auth/facebook" passHref>
        <div className="link" style={{ userSelect: "none" }}>
          <div className="symbol">
            <Image
              src={facebookLogo}
              alt="facebook"
              draggable="false"
            />
          </div>
          <div
            className="login-with-facebook"
            style={{ userSelect: "none" }}
          >
            Login with Facebook
          </div>
        </div>
      </Link>

      {/* Google Button */}
      <Link href="/auth/google" passHref>
        <div className="div" style={{ userSelect: "none" }}>
          <div className="symbol">
            <Image
              src={googleLogo}
              alt="google"
              style={{ width: "20px", height: "auto"}}
              draggable="false"
            />
          </div>
          <div
            className="login-with-google"
            style={{ userSelect: "none" }}
          >
            Login with Google
          </div>
        </div>
      </Link>
    </div>
  );
}
