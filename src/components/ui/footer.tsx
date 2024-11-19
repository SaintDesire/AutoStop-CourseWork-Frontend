export default function Footer() {
    return (
    <footer className="bg-gray-800 text-gray-300">
  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* О нас */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">О нас</h3>
        <p className="text-sm">
          Мы предлагаем лучший выбор автомобилей для покупки и продажи. Наше приложение помогает находить, сравнивать и покупать автомобили с удобством и уверенностью.
        </p>
      </div>

      {/* Полезные ссылки */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Полезные ссылки</h3>
        <ul className="space-y-2">
          <li>
            <a href="/cars" className="hover:text-white">Автомобили</a>
          </li>
          <li>
            <a href="/reviews" className="hover:text-white">Обзоры</a>
          </li>
          <li>
            <a href="/marketplace" className="hover:text-white">Объявления</a>
          </li>
          <li>
            <a href="/contact" className="hover:text-white">Контакты</a>
          </li>
        </ul>
      </div>

      {/* Социальные сети */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Свяжитесь с нами</h3>
        <p className="text-sm mb-4">Следите за нами в социальных сетях:</p>
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <span className="sr-only">Facebook</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.601 0 0 .601 0 1.326v21.348C0 23.399.601 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.796.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.588l-.467 3.622h-3.121V24h6.116c.725 0 1.326-.601 1.326-1.326V1.326C24 .601 23.399 0 22.675 0z" />
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <span className="sr-only">Twitter</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.574 2.163-2.723-.949.564-2.005.974-3.127 1.195-.897-.952-2.173-1.547-3.594-1.547-2.717 0-4.92 2.204-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.733-.666 1.584-.666 2.49 0 1.72.87 3.234 2.188 4.122-.807-.026-1.566-.247-2.229-.616v.061c0 2.404 1.712 4.408 3.977 4.863-.418.112-.861.172-1.316.172-.322 0-.635-.03-.943-.086.631 1.966 2.463 3.397 4.633 3.438-1.7 1.33-3.843 2.123-6.165 2.123-.4 0-.793-.023-1.18-.068 2.203 1.415 4.818 2.24 7.628 2.24 9.142 0 14.307-7.721 14.307-14.417 0-.22-.004-.439-.014-.656.985-.714 1.834-1.604 2.507-2.621z" />
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <span className="sr-only">Instagram</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.342 3.608 1.317.975.975 1.255 2.242 1.317 3.608.058 1.265.069 1.645.069 4.849s-.012 3.584-.07 4.849c-.062 1.366-.342 2.633-1.317 3.608-.975.975-2.242 1.255-3.608 1.317-1.265.058-1.645.069-4.849.069s-3.584-.012-4.849-.07c-1.366-.062-2.633-.342-3.608-1.317-.975-.975-1.255-2.242-1.317-3.608-.058-1.265-.069-1.645-.069-4.849s.012-3.584.07-4.849c.062-1.366.342-2.633 1.317-3.608.975-.975 2.242-1.255 3.608-1.317 1.265-.058 1.645-.069 4.849-.069m0-2.163C8.756 0 8.336.012 7.052.07 5.717.13 4.385.417 3.293 1.51 2.2 2.602 1.913 3.934 1.854 5.269.796 8.756.796 15.244 1.854 18.731c.059 1.335.346 2.667 1.439 3.76 1.093 1.092 2.425 1.38 3.76 1.439 1.487.114 7.975.114 9.463 0 1.335-.059 2.667-.346 3.76-1.439 1.092-1.093 1.38-2.425 1.439-3.76.114-1.487.114-7.975 0-9.463-.059-1.335-.346-2.667-1.439-3.76-1.093-1.093-2.425-1.38-3.76-1.439C15.244.012 8.756.012 7.052.07 8.336.012 8.756 0 12 0z" />
              <circle cx="12" cy="12" r="3.29" />
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div className="mt-8 border-t border-gray-700 pt-4 text-center">
      <p className="text-sm text-gray-400">&copy; 2024 АвтоСтоп. Все права защищены.</p>
    </div>
  </div>
</footer>
    )
}