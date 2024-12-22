"use client";

import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import mylogo from "@/../public/logo_t.png";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { useSession, signOut } from "next-auth/react";

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
  const session = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hideTimeout = useRef(null);
  
  console.log(session);

  useEffect(() => {
    setNavigation((prevNavigation) =>
      prevNavigation.map((item) => ({
        ...item,
        current: pathname === item.href,
      }))
    );
  }, [pathname]);

  const handleMouseEnter = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
    }
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 500);
  };


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
          
          <nav className="navbar">
            {session?.data ? (
              <div
                className="profile-menu"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link href={DASHBOARD_PAGES.PROFILE} className="profile-link">
                  Profile
                </Link>
                {isMenuOpen && (
                  <div
                    className="dropdown-menu"
                    onMouseEnter={handleMouseEnter} // Удерживаем меню открытым при наведении
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className="signout-button"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href={DASHBOARD_PAGES.LOGIN} className="login-button">
                Sign In
              </Link>
            )}
          </nav>

        </div>
      </div>
    </Disclosure>
  );
}
