import Link from "next/link";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";

export default function Footer() {
  return (
    <footer className="text-gray-300 footer">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* О нас */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">О нас</h3>
            <p className="text-sm">
              Мы предлагаем лучший выбор автомобилей для покупки и продажи. Наше
              приложение помогает находить, сравнивать и покупать автомобили с
              удобством и уверенностью.
            </p>
          </div>

          {/* Полезные ссылки */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Полезные ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link href={DASHBOARD_PAGES.CARLIST}>Автомобили</Link>
              </li>
              <li>
                <Link href={DASHBOARD_PAGES.MARKETPLACE}>Объявления</Link>
              </li>
              <li>
                <Link href={DASHBOARD_PAGES.CONTACT}>Контакты</Link>
              </li>
            </ul>
          </div>

          {/* Социальные сети */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Свяжитесь с нами</h3>
            <p className="text-sm mb-4">Следите за нами в социальных сетях:</p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">Facebook</span>
                {/* SVG иконка */}
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">Twitter</span>
                {/* SVG иконка */}
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <span className="sr-only">Instagram</span>
                {/* SVG иконка */}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-400">
            &copy; 2024 АвтоСтоп. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
