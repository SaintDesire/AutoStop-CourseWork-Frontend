'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Share2, Bookmark, Square, MapPin, Phone, MessageCircle } from 'lucide-react'
import Layout from '@/components/ui/layout'

export default function CarDetailsPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/market" className="hover:text-blue-600">Market</Link>
        <span>/</span>
        <span className="text-gray-900">Toyota Camry New</span>
      </nav>

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Toyota Camry New</h1>
        <p className="text-gray-600 mt-1">3.5 D5 PowerPulse Momentum 5dr AWD Geartronic Estate</p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">2023</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">20 miles</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Automatic</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Petrol</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <Bookmark className="w-5 h-5" />
              <span>Save</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <Square className="w-5 h-5" />
              <span>Compare</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Image */}
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg"
              alt="Toyota Camry"
              fill
              className="object-cover"
            />
            <button className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              Video
            </button>
          </div>

          {/* Car Overview */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Car Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Body</span>
                <span className="font-medium">Sedan</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Condition</span>
                <span className="font-medium">New</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Mileage</span>
                <span className="font-medium">20</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Engine Size</span>
                <span className="font-medium">3.5</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Fuel Type</span>
                <span className="font-medium">Petrol</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Door</span>
                <span className="font-medium">4 Doors</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="font-medium mb-3">Interior</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Air Conditioner
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Leather Seats
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3">Safety</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Anti-lock Braking
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Driver Air Bag
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Dimensions & Capacity */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Dimensions & Capacity</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Length</span>
                <span className="font-medium">4950mm</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Width</span>
                <span className="font-medium">2100mm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Price Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Our Price</p>
                <p className="text-3xl font-bold">$165,000</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Instant Saving</p>
                <p className="text-lg font-semibold text-green-600">$5,000</p>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg mb-3 hover:bg-blue-700">
              Make An Offer Price
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50">
              Schedule Test Drive
            </button>
          </div>

          {/* Dealer Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center space-x-4 mb-4">
              <Image
                src="/placeholder.svg"
                alt="Dealer"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold">admin</h3>
                <p className="text-sm text-gray-500">123 Broadway, Brooklyn</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
                <MapPin className="w-4 h-4" />
                <span>Get Direction</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
                <Phone className="w-4 h-4" />
                <span>+86-13345789</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                <MessageCircle className="w-4 h-4" />
                <span>Message Dealer</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Listings */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Related Listings</h2>
          <Link href="/listings" className="text-blue-600 hover:text-blue-700">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Related Car Cards */}
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/placeholder.svg"
                  alt="Related Car"
                  fill
                  className="object-cover"
                />
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm">
                  <Bookmark className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">Mercedes-Benz C Class</h3>
                <p className="text-sm text-gray-600 mb-3">2.0 D4 PowerPulse Momentum 5dr AW...</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>100 Miles</span>
                  <span>Petrol</span>
                  <span>Automatic</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-semibold">$35,000</span>
                  <Link href="#" className="text-blue-600 hover:text-blue-700">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Layout>
  )
}

