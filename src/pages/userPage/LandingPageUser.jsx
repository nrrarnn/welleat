import { FaAppleAlt, FaHeart, FaCarrot } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function LandingPageUser() {
  return (
    <div>


      <section className="bg-white text-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Selamat Datang</h2>
            <p className="mt-4 text-gray-900">
              Temukan informasi lainnya disini.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Link
              className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-green-500/10 hover:shadow-green-500/10"
              to="/daftar-product"
            >
              <FaAppleAlt className="size-10 text-green-500" size={40} />
              <h2 className="mt-4 text-xl font-bold text-gray">Daftar Product</h2>
              <p className="mt-1 text-sm text-gray">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis, ab!
              </p>
              <span className="mb-5 text-sm text-gray-500">View More</span>
            </Link>

            <Link
              className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-red-500/10 hover:shadow-red-500/10"
              to="/favorite"
            >
              <FaHeart className="size-10 text-red-500" size={40} />
              <h2 className="mt-4 text-xl font-bold text-gray">Favorite</h2>
              <p className="mt-1 text-sm text-gray">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, nostrum?
              </p>
              <span className="mb-5 text-sm text-gray-500">View More</span>
            </Link>

            <a
              className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-orange-500/10 hover:shadow-orange-500/10"
              href="/detail-recipe/:id"
            >
              <FaCarrot className="size-10 text-orange-500" size={40} />
              <h2 className="mt-4 text-xl font-bold text-gray">Detail Product</h2>
              <p className="mt-1 text-sm text-gray">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, blanditiis.
              </p>
              <span className="mb-5 text-sm text-gray-500">View More</span>
            </a>
            
          </div>

          <div className="mt-12 text-center">
            <a
              href="/daftar-product"
              className="inline-block rounded bg-green-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring focus:ring-yellow-400"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPageUser;
