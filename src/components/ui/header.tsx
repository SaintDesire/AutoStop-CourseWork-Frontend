"use client";

import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import mylogo from "@/../public/logo_t.png";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { AuthContext } from "@/components/ui/authProvider";

const initialNavigation = [
  { name: "Home", href: DASHBOARD_PAGES.HOME, current: false },
  { name: "Catalog", href: DASHBOARD_PAGES.CARLIST, current: false },
  { name: "Market", href: DASHBOARD_PAGES.MARKETPLACE, current: false },
  { name: "About", href: DASHBOARD_PAGES.ABOUT, current: false },
  { name: "Contact", href: DASHBOARD_PAGES.CONTACT, current: false },
];

interface UserData {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export default function Header() {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
  const [navigation, setNavigation] = useState(initialNavigation);
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Состояние загрузки

  // Обновление текущего маршрута в навигации
  useEffect(() => {
    setNavigation((prevNavigation) =>
      prevNavigation.map((item) => ({
        ...item,
        current: pathname === item.href,
      }))
    );
  }, [pathname]);

  // Запрос к серверу для проверки сессии при монтировании компонента
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/auth/session", {
          method: "GET",
          credentials: "include", // Важно для отправки и получения cookies
        });

        if (response.ok) {
          const data: UserData = await response.json();
          setIsAuthenticated(true);
          setUser(data);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching session:", err);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false); // Завершение загрузки
      }
    };

    fetchSession();
  }, [setIsAuthenticated, setUser]);

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

  /**
   * Функция для выхода из системы
   */
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(false);
        setUser(null);
        router.push("/"); // Перенаправление на главную страницу после успешного выхода
      } else {
        const data = await response.json();
        setError(data.message || "Logout failed");
      }
    } catch (err) {
      console.error("Error during logout:", err);
      setError("An error occurred during logout. Please try again.");
    }
  };

  if (isLoading) {
    // Отображение индикатора загрузки
    return (
      <div className="header-nav">
        <div className="container">
          <div className="header-inner">
            <div className="logo">
              <Image alt="AUTOSTOP" src={mylogo} width={32} height={32} draggable={false} />
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
              <p>Loading...</p>
            </nav>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Disclosure as="nav" className="header-nav">
      <div className="container">
        <div className="header-inner">
          <div className="logo">
            <Image alt="AUTOSTOP" src={mylogo} width={32} height={32} draggable={false} />
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
            {isAuthenticated ? (
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
                      onClick={handleLogout}
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

      {/* Отображение ошибки, если есть */}
      {error && (
        <div className="error-message">
          <p style={{ color: "red" }}>{error}</p>
        </div>
      )}
    </Disclosure>
  );
}
