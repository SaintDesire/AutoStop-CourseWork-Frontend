import Image from "next/image";
import facebookLogo from '@/../public/facebook.png';
import googleLogo from '@/../public/google.png';
import Divider from "./divider";

const OAuthButtons = () => {
  return (
    <div className="oauth-container">
        <Divider/>
      <div className="link">
        <div className="symbol">
          <Image src={facebookLogo} alt="facebook" />
        </div>
        <div className="login-with-facebook">Login with Facebook</div>
      </div>
      <div className="div">
        <div className="text-wrapper">
          <Image src={googleLogo} alt="google" />
        </div>
        <div className="login-with-google">Login with Google</div>
      </div>
    </div>
  );
};

export default OAuthButtons;
