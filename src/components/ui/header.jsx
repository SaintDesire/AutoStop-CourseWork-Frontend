"use client";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import mylogo from "@/../public/logo_t.png";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

// Исправить проблему с обновлением страницы и изменением цвета кнопки текущей страницы
const initialNavigation = [
  { name: "Home", href: DASHBOARD_PAGES.HOME, current: true },
  { name: "Catalog", href: DASHBOARD_PAGES.CARLIST, current: false },
  { name: "Market", href: DASHBOARD_PAGES.MARKETPLACE, current: false },
  { name: "About", href: DASHBOARD_PAGES.ABOUT, current: false },
  { name: "Contact", href: DASHBOARD_PAGES.CONTACT, current: false },
];

const userNavigation = [
  { name: "Profile", href: DASHBOARD_PAGES.PROFILE },
  { name: "Settings", href: DASHBOARD_PAGES.SETTINGS },
  { name: "Logout", href: DASHBOARD_PAGES.SIGNOUT },
];

const loginButton = "Sign In"

export default function Header() {
  const [navigation, setNavigation] = useState(initialNavigation);

  const changeActive = (activePage) => {
    setNavigation((prevNavigation) =>
      prevNavigation.map((item) =>
        item.name === activePage
          ? { ...item, current: true }
          : { ...item, current: false }
      )
    );
  };

  return (
    <Disclosure as="nav" className="header-nav">
      <div className="container">
        <div className="header-inner">
        <div className="logo">
        <Image 
          alt="AUTOSTOP"
          src={mylogo}
          width={32}
          draggable={false}
        />
          <span className="logo-text">
            AutoStop
          </span>
        </div>


          <div className="nav-links">
            <div className="nav-list">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  onClick={() => changeActive(item.name)}
                  className={`nav-link ${item.current ? 'active' : 'inactive'}`}
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