import { useState } from "react";
import { Avatar } from "@nextui-org/react";
import withAuth from "../../hoc/withAuth";

const UserCard = () => {
  // Mengelola status dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fungsi untuk toggle visibilitas dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Fungsi untuk menutup dropdown saat klik di luar
  const handleClickOutside = (event) => {
    if (event.target.closest("#user-menu-button") === null && isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  // Menambahkan event listener untuk klik di luar dropdown
  useState(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  return (
  <div>
  <nav className="bg-white-700">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          {/* Icon search */}
          


          {/* Tombol menu mobile */}
          <button
            type="button"
            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="absolute -inset-0.5"></span>
            <span className="sr-only">Buka menu utama</span>
            {/* Ikon saat menu tertutup */}
            <svg
              className="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            {/* Ikon saat menu terbuka */}
            <svg
              className="hidden h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="./img/logo-tb.png"
              alt="Perusahaan Anda"
            />
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              <a
                href="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-700 hover:text-black"
                aria-current="page"
              >
                Beranda
              </a>
              {/* <a
                href="/dashboard-admin"
                className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-700 hover:text-white"
              >
                Dashboard
              </a> */}
              <a
                href="/daftar-product"
                className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-700 hover:text-black"
              >
                Daftar Product
              </a>
              <a
                href="/detail-recipe/:id"
                className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-700 hover:text-black"
              >
                Detail Product
              </a>
              <a
                href="/favorite"
                className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white"
              >
                Favorite
              </a>
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button
            type="button"
            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span className="absolute -inset-1.5"></span>
            <span className="sr-only">Lihat notifikasi</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </button>

          {/* Dropdown profil */}
          <div className="relative ml-3">
            <div>
              <button
                type="button"
                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                onClick={toggleDropdown}
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Buka menu pengguna</span>
                <Avatar
                  showFallback
                  src="https://images.unsplash.com/broken"
                />
              </button>
            </div>
            {isDropdownOpen && (
              <div
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-0"
                >
                  Profil Anda
                </a>
                {/* <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-1"
                >
                  Pengaturan
                </a> */}
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-2"
                >
                  Keluar
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Menu mobile, tampilkan/sembunyikan berdasarkan status menu */}
    <div className="sm:hidden" id="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2">
        <a
          href="/"
          className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
          aria-current="page"
        >
          Beranda
        </a>
        {/* <a
          href="/dashboard-admin"
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          Dashboard
        </a> */}
        <a
          href="/daftar-product"
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          Daftar Product
        </a>
        <a
          href="/detail-recipe/:id"
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          Detail Product
        </a>
        <a
          href="/favorite"
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          Favorite
        </a>
      </div>
    </div>
  </nav>

  <section>
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 w-full">
      <div className="mx-auto max-w-3xl">
        <header className="text-center">
          <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Daftar User
          </h1>
          <p>Lihat informasi Mengenai user </p>
        </header>

        <div className="mt-8">
          <ul className="space-y-4">
            <li className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-lg">
              <Avatar
                showFallback
                src="https://images.unsplash.com/broken"
              />

              <div className="bg-gray-50 rounded-lg">
                <h3 className="text-sm text-gray-900">Pengguna</h3>

                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                  <div>
                    <dt className="inline">ID:</dt>
                    <dd className="inline">12345</dd>
                  </div>

                  <div>
                    <dt className="inline">No HP:</dt>
                    <dd className="inline">081234567890</dd>
                  </div>

                  <div>
                    <dt className="inline">Email:</dt>
                    <dd className="inline">johndoe@example.com</dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-1 items-center justify-end gap-2">
                {/* <button className="text-gray-600 transition hover:text-blue-600">
                  <span className="sr-only">Edit item</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487a2.626 2.626 0 113.714 3.713L7.5 21.276l-4.121.458a1 1 0 01-1.1-1.1l.457-4.121L16.862 4.487z"
                    />
                  </svg>
                </button> */}

                <button className="text-gray-600 transition hover:text-red-600">
                  <span className="sr-only">Hapus item</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</div>

  );
};

// Komponen untuk menampilkan setiap card user

export default withAuth(UserCard);
