"use client";

import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SidebarProps {
  role: number | null;
  setActiveSection: (section: string) => void; // Новый проп
}

export default function Sidebar({ role, setActiveSection }: SidebarProps) {
  const [IsAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (role === 1) {
      setIsAdmin(true);
    }
  }, [role]);

  return (
    <nav className="sidebar">
      <ul>
        <li>
          <button onClick={() => setActiveSection("profile")}>Profile</button>
        </li>
        <li>
          <button onClick={() => setActiveSection("dashboard")}>Dashboard</button>
        </li>
        <li>
          <button onClick={() => setActiveSection("favourites")}>Favourites</button>
        </li>
        {IsAdmin && (
          <li>
            <button onClick={() => setActiveSection("admin panel")}>Admin Dashboard</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
