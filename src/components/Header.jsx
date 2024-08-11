import { Link } from "react-router-dom"

const Header  = () => {
  return(
    <>
      <header className="fixed font-poppins top-0 flex h-20 w-full bg-white shadow-md px-12 justify-between items-center z-50">
        <div className="flex justify-center items-center">
            <img src="./img/logo.png" alt="Logo" className="w-[40px] h-[40px]"/>
            <h1 className="font-bold text-sky-600 text-xl"><span className="text-slate-900">Well</span>Eat.</h1>
        </div>
        <div className="flex">
            <ul className="lg:flex hidden gap-5 font-medium text-slate-700 cursor-pointer">
              <li className="hover:text-sky-500"><a href="#home">Beranda</a></li>
              <li className="hover:text-sky-500"><a href="#about">Tentang</a></li>
              <li className="hover:text-sky-500"><a href="#testimoni">Testimoni</a></li>
              <li className="hover:text-sky-500"><a href="#faq">FAQ</a></li>
            </ul> 
        </div>
        <div className="">
            <Link to={'/login'}><button className="px-5 py-2 bg-sky-400 rounded-full text-white font-medium">Masuk</button></Link>
        </div>
      </header>
    </>
  )
}

export default Header 