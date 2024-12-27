"use client"

import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import Link from "next/link";

export default function Sidebar() {
  const handleLogout = async () => {
    try {
    const response = await fetch("http://localhost:3001/api/auth/logout", {
      method: "POST",
      credentials: "include", // Автоматическая отправка cookies
    });

      if (response.ok) {
        console.log("Logout successful");
      } else {
        console.error("Logout failed:", response.status, response.statusText);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <nav className="sidebar">
      <ul>
        <li className="active">
          <Link href={DASHBOARD_PAGES.PROFILE}>Profile</Link>
        </li>
        <li>
          <Link href={DASHBOARD_PAGES.PROFILE_DASHBOARD}>Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
}
