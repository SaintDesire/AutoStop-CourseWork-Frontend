import Link from "next/link";
import Tabs from "@/components/ui/auth/tabs";
import InputField from "@/components/ui/auth/inputField";
import OAuthButtons from "@/components/ui/auth/oAuthButtons";
import Divider from "@/components/ui/auth//divider";

const Login = () => {
  return (
    <div className="login-window" style={{minHeight: '800px'}}>
      <div className="login-area">
        <Tabs active="signin"/>
        <div className="placeholder-form">
          <InputField type="email" label="Email" />
          <InputField type="password" label="Password" />
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
          <Link
            href="/"
            style={{ color: "#405FF2", textDecoration: "underline" }}
          >
            Lost your password?
          </Link>
        </div>
        <button className="button">
          <div className="text-wrapper">Login</div>
        </button>
        <OAuthButtons />
      </div>
    </div>
  );
};

export default Login;
