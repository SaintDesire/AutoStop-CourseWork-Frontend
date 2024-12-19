import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full bg-gray-100 dashboard" style={{margin: '0px auto'}}>
      {children}
    </div>
  )
}

