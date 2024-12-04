import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex w-5/6 h-full bg-gray-100 dashboard" style={{margin: '0px auto', borderRadius: '10px'}}>
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Кабинет</h2>
          <nav className="space-y-2">
            <Link href={DASHBOARD_PAGES.PROFILE} className="block py-2 px-4 text-gray-700 hover:bg-primary hover:text-white hover:bg-black rounded transition duration-200">
              Профиль
            </Link>
            <Link href={DASHBOARD_PAGES.PROFILE_ADS} className="block py-2 px-4 text-gray-700 hover:bg-primary hover:text-white hover:bg-blackrounded transition duration-200">
              Мои объявления
            </Link>
          </nav>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}

