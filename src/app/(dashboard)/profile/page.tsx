import { UserProfile } from '@/components/ui/dashboard/userProfile'

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Кабинет пользователя</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <UserProfile />
      </div>
    </div>
  )
}

