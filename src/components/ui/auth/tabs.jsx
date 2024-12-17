import Link from "next/link";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";

export default function Tabs({ active }) {
  console.log({ active });

  return (
    <div className="tab-container">
      {/* Кнопка Sign in */}
      <button className={`tab ${active === "signin" ? "active" : ""}`}>
        <Link href={DASHBOARD_PAGES.LOGIN}>
          Sign in
        </Link>
      </button>

      {/* Кнопка Sign Up */}
      <button className={`tab ${active === "signup" ? "active" : ""}`}>
        <Link href={DASHBOARD_PAGES.SIGNUP}>
          Sign Up
        </Link>
      </button>
    </div>
  );
}
