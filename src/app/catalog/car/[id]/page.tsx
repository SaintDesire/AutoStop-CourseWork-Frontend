'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Share2, Heart, LayoutGrid } from 'lucide-react'
import Layout from '@/components/ui/layout'

export default function CarDetailsPage() {
    const mainImage = '/placeholder.svg?height=400&width=600'
    const thumbnails = Array(4).fill('/placeholder.svg?height=200&width=300')
    
    return (
        <Layout>
            <div className="max-w-[1200px] mx-auto px-4 py-8">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm mb-6">
                <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
                <span className="text-gray-500">/</span>
                <Link href="/catalog" className="text-gray-500 hover:text-gray-700">Catalog</Link>
                <span className="text-gray-500">/</span>
                <span className="text-gray-900">Toyota Camry New</span>
            </div>

            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Toyota Camry New</h1>
                    <p className="text-gray-600 mb-4">3.5 D5 PowerPulse Momentum 5dr AWD Geartronic Estate</p>
                    <div className="flex gap-4 text-sm">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            2023
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            20 Miles
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            Automatic
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            Petrol
                        </span>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex gap-4 mb-4">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Heart className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="text-2xl font-bold">min. $40,000</div>
                </div>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-4 gap-4 mb-12">
                <div className="col-span-2 row-span-2 relative">
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                        Great Price
                    </div>
                    <div className="absolute bottom-4 left-4 bg-white/80 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        Video
                    </div>
                    <Image
                        src={mainImage}
                        alt="Toyota Camry"
                        width={600}
                        height={400}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                {thumbnails.map((thumb, idx) => (
                    <div key={idx} className="relative">
                        <Image
                            src={thumb}
                            alt={`Thumbnail ${idx + 1}`}
                            width={300}
                            height={200}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>

            {/* Car Overview */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Car Overview</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Body', value: 'Sedan' },
                        { label: 'Condition', value: 'New' },
                        { label: 'Mileage', value: '20' },
                        { label: 'Engine Size', value: '3.5' },
                        { label: 'Fuel Type', value: 'Petrol' },
                        { label: 'Door', value: '4 Doors' },
                        { label: 'Year', value: '2023' },
                        { label: 'Cylinder', value: '12' },
                        { label: 'Transmission', value: 'Automatic' },
                        { label: 'Color', value: 'Black, Blue, White' },
                        { label: 'Drive Type', value: 'All-Wheel Drive (AWD/4WD)' },
                        { label: 'VIN', value: 'MC823368' },
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col">
                            <span className="text-gray-500 text-sm">{item.label}</span>
                            <span className="font-medium">{item.value}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Description */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Description</h2>
                <p className="text-gray-600 mb-4">
                    Quisque imperdiet dignissim ante dictum finibus. Sed consectetur cursus enim eget laoreet. Aenean vitae nisi mollis, porta risus
                    vel, eleifend lectus. Etiam ac suscipit eros eget maximus.
                </p>
                <p className="text-gray-600">
                    Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat
                    pellentesque. Sed venenatis risus nec felis mollis, ut pharetra orci euismod. Morbi aliquam id turpis sit amet ultrices. Vestibulum
                    mattis blandit nisl, et tristique est scelerisque nec. Fusce eleifend blandit elit, eget aliquam sit amet massa et nunc pretium scelerisque.
                </p>
            </section>

            {/* Features */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-semibold mb-4">Interior</h3>
                        <ul className="space-y-2">
                            {['Air Conditioner', 'Digital Odometer', 'Heater', 'Leather Seats', 'Panorama Moonroof', 'Tachometer', 'Touchscreen Display'].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Safety</h3>
                        <ul className="space-y-2">
                            {['Anti-lock Braking', 'Brake Assist', 'Child Safety Locks', 'Driver Air Bag', 'Power Door Locks', 'Stability Control', 'Traction Control'].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Exterior</h3>
                        <ul className="space-y-2">
                            {['Fog Light Front', 'Rain Sensing Wiper', 'Rear Spoiler', 'Windows - Electric'].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Comfort & Convenience</h3>
                        <ul className="space-y-2">
                            {['Android Auto', 'Apple CarPlay', 'Bluetooth', 'HomeLink', 'Power Steering'].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Dimensions & Capacity */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Dimensions & Capacity</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Length', value: '4950mm' },
                        { label: 'Width', value: '2100mm' },
                        { label: 'Height', value: '1500mm' },
                        { label: 'Width (including mirrors)', value: '2140mm' },
                        { label: 'Wheelbase', value: '2950mm' },
                        { label: 'Gross Vehicle Weight (kg)', value: '5550' },
                        { label: 'Height (excluding roof rails)', value: '1650mm' },
                        { label: 'Max. Loading Weight (kg)', value: '1200' },
                        { label: 'Luggage Capacity (Seats Up - Litres)', value: '450' },
                        { label: 'Max. Roof Load (kg)', value: '400' },
                        { label: 'Luggage Capacity (Seats Down - Litres)', value: '850' },
                        { label: 'No. of Seats', value: '5' },
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col">
                            <span className="text-gray-500 text-sm">{item.label}</span>
                            <span className="font-medium">{item.value}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Engine and Transmission */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Engine and Transmission</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                        { label: 'Fuel Tank Capacity (Litres)', value: '80' },
                        { label: 'Minimum Kerb Weight (kg)', value: '550' },
                        { label: 'Max. Towing Weight - Braked (kg)', value: '1000' },
                        { label: 'Turning Circle - Kerb to Kerb (m)', value: '6800' },
                        { label: 'Max. Towing Weight - Unbraked (kg)', value: '1100' },
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col">
                            <span className="text-gray-500 text-sm">{item.label}</span>
                            <span className="font-medium">{item.value}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Related Listings */}
            <section>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Related Listings</h2>
                    <Link href="/catalog" className="text-blue-600 hover:text-blue-700">
                        View All
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        {
                            title: 'Mercedes-Benz C Class',
                            price: '$35,000',
                            specs: '2.0 D5 PowerPulse Momentum 5dr AW',
                            mileage: '100 Miles',
                            fuel: 'Petrol',
                            transmission: 'Automatic'
                        },
                        {
                            title: 'Ranger White - 2022',
                            price: '$25,000',
                            specs: '2.0 D5 PowerPulse Momentum 5dr AW',
                            mileage: '30000 Miles',
                            fuel: 'Diesel',
                            transmission: 'Manual'
                        },
                        {
                            title: 'T-Cross - 2023',
                            price: '$15,000',
                            specs: '4.0 D5 PowerPulse Momentum 5dr AW',
                            mileage: '15 Miles',
                            fuel: 'Petrol',
                            transmission: 'CVT'
                        },
                        {
                            title: 'BMW X5 - 5.0',
                            price: '$12,000',
                            specs: '4.0 D5 PowerPulse Momentum 5dr AW',
                            mileage: '100 Miles',
                            fuel: 'Hybrid',
                            transmission: 'CVT'
                        }
                    ].map((car, idx) => (
                        <div key={idx} className="border rounded-lg p-4">
                            <div className="relative mb-4">
                                <Image
                                    src="/placeholder.svg?height=200&width=300"
                                    alt={car.title}
                                    width={300}
                                    height={200}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                {idx === 0 && (
                                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                                        Great Price
                                    </div>
                                )}
                            </div>
                            <h3 className="font-semibold mb-2">{car.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">{car.specs}</p>
                            <div className="flex gap-4 text-sm mb-4">
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    {car.mileage}
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    {car.fuel}
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    {car.transmission}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-bold">{car.price}</span>
                                <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
        </Layout>
    )
}

