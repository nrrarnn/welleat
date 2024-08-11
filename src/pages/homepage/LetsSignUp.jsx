import { Link } from "react-router-dom";

const LetsSignUp = () => {
  return(
    <>
    <div className="flex justify-center font-poppins">
      <div className="my-8 w-[97%] bg-sky-600 rounded-lg text-white px-10 py-20 text-center">
        <h1>Dapatkan akses penuh ke semua resep</h1>
        <p className="text-white">Silahkan daftar untuk menikmati seluruh koleksi kami!</p>
        <Link to={'/register'}><button className="bg-sky-50 text-sky-500 rounded-lg font-bold px-6 py-2 mt-6">Daftar</button></Link>
      </div>
      </div>
    </>
  )
}

export default LetsSignUp;