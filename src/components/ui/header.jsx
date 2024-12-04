"use client";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import Modal from "./modalAuth";
import openModal from "../../services/openModal";
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
  { name: "Главная", href: DASHBOARD_PAGES.HOME, current: true },
  { name: "Каталог", href: DASHBOARD_PAGES.CARLIST, current: false },
  { name: "Маркет", href: DASHBOARD_PAGES.MARKETPLACE, current: false },
  { name: "О нас", href: DASHBOARD_PAGES.ABOUT, current: false },
  { name: "Контакты", href: DASHBOARD_PAGES.CONTACT, current: false },
];

const userNavigation = [
  { name: "Профиль", href: DASHBOARD_PAGES.PROFILE },
  { name: "Настройки", href: DASHBOARD_PAGES.SETTINGS },
  { name: "Выйти из аккаунта", href: DASHBOARD_PAGES.SIGNOUT },
];

const loginButton = "Войти"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
            <span className="logo-auto">Auto</span>
            <span className="logo-stop">Stop</span>
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

          <button className="login-button" onClick={openModal}>
            {loginButton}
          </button>
          <Modal />

          <div className="user-actions">
            <button
              type="button"
              className="notification-button"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="bell-icon" />
            </button>

            <Menu as="div" className="user-menu">
              <div>
                <MenuButton className="user-menu-button">
                  <span className="sr-only">Open user menu</span>
                  <img alt="" src={user.imageUrl} className="user-avatar" />
                </MenuButton>
              </div>
              <MenuItems className="user-menu-items">
                {userNavigation.map((item) => (
                  <MenuItem key={item.name}>
                    <a href={item.href} className="user-menu-link">
                      {item.name}
                    </a>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>

        </div>
      </div>

      <DisclosurePanel className="mobile-nav">
        <div className="mobile-nav-list">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={`mobile-nav-link ${item.current ? 'active' : 'inactive'}`}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
  }