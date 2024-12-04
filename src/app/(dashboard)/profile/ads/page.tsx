import { UserAds } from '@/components/ui/dashboard/userAds'

export default function AdsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Мои объявления</h1>
      <UserAds />
    </div>
  )
}

