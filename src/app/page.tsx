import Link from "next/link";
import Login from "./auth/login/page";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";

export default function Home() {
  return (
    <div>
      <h1>HOME PAGE</h1>
      <Link href={DASHBOARD_PAGES.LOGIN}>LOGIN</Link><br/>
      <Link href={DASHBOARD_PAGES.SIGNUP}>SIGNUP</Link>
    </div>
  );
}
