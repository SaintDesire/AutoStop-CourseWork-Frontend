"use client";

import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Импортируем usePathname
import mylogo from "@/../public/logo_t.png";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";

const initialNavigation = [
  { name: "Home", href: DASHBOARD_PAGES.HOME, current: false },
  { name: "Catalog", href: DASHBOARD_PAGES.CARLIST, current: false },
  { name: "Market", href: DASHBOARD_PAGES.MARKETPLACE, current: false },
  { name: "About", href: DASHBOARD_PAGES.ABOUT, current: false },
  { name: "Contact", href: DASHBOARD_PAGES.CONTACT, current: false },
];

const loginButton = "Sign In";

export default function Header() {
  const [navigation, setNavigation] = useState(initialNavigation);
  const pathname = usePathname();

  useEffect(() => {
    setNavigation((prevNavigation) =>
      prevNavigation.map((item) => ({
        ...item,
        current: pathname === item.href,
      }))
    );
  }, [pathname]);

  return (
    <Disclosure as="nav" className="header-nav">
      <div className="container">
        <div className="header-inner">
          <div className="logo">
            <Image alt="AUTOSTOP" src={mylogo} width={32} draggable={false} />
            <span className="logo-text">AutoStop</span>
          </div>

          <div className="nav-links">
            <div className="nav-list">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={`nav-link ${item.current ? "active" : "inactive"}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href={DASHBOARD_PAGES.LOGIN} className="login-button">
            {loginButton}
          </Link>
        </div>
      </div>
    </Disclosure>
  );
}
