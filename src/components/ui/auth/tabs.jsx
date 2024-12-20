import Link from "next/link";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";

export default function Tabs({ active }) {
  console.log({ active });

  return (
    <div className="tab-container">
      {/* Кнопка Sign in */}
      <Link href={DASHBOARD_PAGES.LOGIN}>
        <button className={`tab ${active === "signin" ? "active" : ""}`}>
            Sign In
        </button>
      
      </Link>

      {/* Кнопка Sign Up */}
      <Link href={DASHBOARD_PAGES.SIGNUP}>
        <button className={`tab ${active === "signup" ? "active" : ""}`}>
          
            Sign Up
        </button>
      
      </Link>
    </div>
  );
}
