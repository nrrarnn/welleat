import { FaInstagram } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <footer className="bg-sky-50 text-slate-700 py-8 mt-3 font-poppins">
        <div className="container px-10 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="font-bold text-lg mb-4 ">INFORMASI WELLEAT</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Tentang WellEat
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Kebijakan WellEat
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Kebijakan Privasi
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-4">BANTUAN & DUKUNGAN</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Informasi Resep
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Detail Resep
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Favorit Resep
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-4">LAYANAN</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Hubungi Kami
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Pemberitahuan
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h1 className="font-bold text-xl">Follow Us</h1>
            <div className="flex gap-4">
              <FaInstagram />
              <TfiEmail />
              <FaXTwitter />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm">
          <p>&copy; 2024 WellEat. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
