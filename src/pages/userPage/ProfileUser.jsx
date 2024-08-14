import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function ProfileUser() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg border border-gray-200">
        <div className="px-6 py-4 flex items-center">
          <FaUserCircle className="text-gray-500 text-3xl mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              User Profile
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Informasi Pengguna
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl className="divide-y divide-gray-200">
            <div className="px-6 py-4">
              <dt className="text-sm font-medium text-gray-500">
                Full name
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                John Doe
              </dd>
            </div>
            <div className="px-6 py-4">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                johndoe@example.com
              </dd>
            </div>
            <div className="px-6 py-4">
              <dt className="text-sm font-medium text-gray-500">
                Phone number
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                (123) 456-7890
              </dd>
            </div>
            <div className="px-6 py-4">
              <dt className="text-sm font-medium text-gray-500">
                Address
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                123 Main St<br />
                Anytown, USA 12345
              </dd>
            </div>
          </dl>
        </div>
        <div className="px-6 py-4">
          <Link 
            to="/homepage-user" 
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Kembali
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProfileUser
