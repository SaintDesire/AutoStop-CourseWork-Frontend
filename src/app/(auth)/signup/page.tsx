import Link from "next/link";
import Tabs from "@/components/ui/auth/tabs";
import InputField from "@/components/ui/auth/inputField";
import OAuthButtons from "@/components/ui/auth/oAuthButtons";
import Divider from "@/components/ui/auth//divider";

const SignUp = () => {
  return (
    <div className="signup-window" style={{minHeight: '800px'}}>
      <div className="signup-area">
        <Tabs active="signup"/>
        <div className="placeholder-form">
          <InputField type="email" label="Email" />
          <InputField type="password" label="Password" />
          <InputField type="password" label="Confirm password" />
        </div>
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
        <button className="button">
          <div className="text-wrapper">Sign Up</div>
        </button>
        <OAuthButtons />
      </div>
    </div>
  );
};

export default SignUp;
