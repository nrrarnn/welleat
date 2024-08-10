const Testimonials = () => {
  const testimonials = [
  {
    name: "Sarah",
    message: "Dengan fitur favorit di WellEat, saya bisa dengan mudah menyimpan dan mengakses resep yang saya suka. Ini membuat perencanaan makan menjadi jauh lebih sederhana.",
    img: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    name: "Tika",
    message: "Saya suka memasak, tapi sering kehabisan ide. WellEat selalu memberikan inspirasi dengan resep-resep baru yang enak dan sehat. Keluarga saya jadi lebih senang makan di rumah!",
    img: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "Alice",
    message: "Resep-resep di WellEat benar-benar berkualitas. Tidak hanya enak, tapi juga memberikan manfaat kesehatan yang nyata. Saya sangat merekomendasikan platform ini!",
    img: 'https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

  return(
    <>
    <div className="mt-44 py-10  sm:py-16 lg:py-24 px-7 sm:px-48 flex flex-col justify-center items-center font-poppins">
      <h1 className="font-bold text-3xl text-slate-800 text-center mb-12">Pengalaman Mereka Bersama Well<span className="text-sky-600">Eat</span> </h1>
        <ol className="relative border-l border-slate-200 dark:border-gray-700">
        {testimonials.map((testimonial, index) => (
          <li className="mb-10 ml-20" key={index}>
            <span className="absolute flex items-center justify-center w-[60px] h-[60px] bg-blue-100 rounded-full -left-3 ring-8 ring-white ">
              <img src={`${testimonial.img}`} className="w-[50px] h-[50px] rounded-full object-cover" />
            </span>
            <div className="px-4 py-2 border border-slate-400 rounded-lg">
              <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                {testimonial.name} 
              </h3>
              <p className="mb-4 text-base font-normal text-gray-500">{testimonial.message}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
    </>
  )
}

export default Testimonials;