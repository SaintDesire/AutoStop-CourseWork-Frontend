import Link from "next/link";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";

export default function Footer() {
  return (
    <footer className="footer-text-color">
      <div className="footer-container">
        <div className="grid-container">
          {/* О нас */}
          <div>
            <h3 className="section-title">О нас</h3>
            <p className="section-description">
              Мы предлагаем лучший выбор автомобилей для покупки и продажи. Наше
              приложение помогает находить, сравнивать и покупать автомобили с
              удобством и уверенностью.
            </p>
          </div>

          {/* Полезные ссылки */}
          <div>
            <h3 className="section-title">Полезные ссылки</h3>
            <ul className="link-list">
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
            <h3 className="section-title">Свяжитесь с нами</h3>
            <p className="section-description mb-4">Следите за нами в социальных сетях:</p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="sr-only">Facebook</span>
                {/* SVG иконка */}
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="sr-only">Twitter</span>
                {/* SVG иконка */}
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="sr-only">Instagram</span>
                {/* SVG иконка */}
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-text">&copy; 2024 АвтоСтоп. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
