import Image from 'next/image'

type AdCardProps = {
  id: number
  title: string
  description: string
  price: number
  imageUrl: string
}

export function AdCard({ id, title, description, price, imageUrl }: AdCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-64 flex-shrink-0">
      <div className="relative h-64 w-full">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        {imageUrl}
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
        <p className="text-xl font-bold text-black">{price.toLocaleString('ru-RU')} ₽</p>
      </div>
    </div>
  )
}

