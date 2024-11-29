"use client";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import Modal from "./modalAuth";
import openModal from "../../services/openModal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import mylogo from "../../../public/logo-2.png";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

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
    <Disclosure as="nav" className="bg-gray-800 header-nav">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Image
              alt="AUTOSTOP"
              src={mylogo}
              draggable={false}
              style={{
                width: "130px",
                userSelect: "none",
              }}
            />
          </div>

          <div className="flex-grow hidden md:flex justify-center">
            <div className="flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  onClick={() => changeActive(item.name)}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
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

          <div className="hidden md:block">
            <div className="flex items-center">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>

              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    <img alt="" src={user.imageUrl} className="size-8 rounded-full" />
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <a href={item.href} className="block px-4 py-2 text-sm text-gray-700">
                        {item.name}
                      </a>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
              <Bars3Icon className="block size-6" aria-hidden="true" />
              <XMarkIcon className="hidden size-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="md:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
