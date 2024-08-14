import { useState, useEffect } from "react";
import { Avatar } from "@nextui-org/react";


const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to close the dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (!event.target.closest("#avatar-button") && !event.target.closest("#dropdown-menu")) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky font-poppins top-0 flex h-20 w-full bg-white shadow-md px-12 justify-between items-center z-50">
      <div className="flex justify-center items-center">
        <img src="./img/logo.png" alt="Logo" className="w-[40px] h-[40px]" />
        <h1 className="font-bold text-sky-600 text-xl">
          <span className="text-slate-900">Well</span>Eat.
        </h1>
      </div>
      <div className="flex">
        
      </div>
      <div className="relative flex items-center gap-4">
        <Avatar
          showFallback
          src="https://images.unsplash.com/broken"
          size="lg"
          className="cursor-pointer"
          onClick={toggleDropdown}
          id="avatar-button"
        />
        {isDropdownOpen && (
          <div
            id="dropdown-menu"
            className="absolute right-0 mt-12 w-48 bg-white border rounded-md shadow-lg"
          >
            <ul className="py-1">
              <li>
                <a
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
