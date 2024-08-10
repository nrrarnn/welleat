const WhyWellEat = () => {
  const list = [
    {
  
      title:'Resep Sehat untuk gizi seimbang',
      description: 'Temukan resep yang mendukung kebutuhan gizi seimbang Anda.'
    },
    {

      title:'Kemudahan Mengelola Resep',
      description: 'Simpan resep yang Anda suka ke halaman favorit agar mudah di akses.'
    },
     {
 
      title:'Fitur Komentar',
      description: 'Berikan dan baca komentar pada resep untuk berbagi pengalaman.'
    },
     {

      title:'Akses Mudah dan Fleksibel',
      description: 'Nikmati kemudahan mengakses WellEat kapan saja dan di mana saja dari perangkat apa pun.'
    },
   
   
  ]
  return(
    <>
    <div className="mt-20 ">
       
      <div className="w-full px-6 sm:px-36  flex flex-col sm:flex-row gap-6 font-poppins">
          <div className="w-full sm:w-[48%] flex flex-col justify-center items-center">
            <h1 className="text-center font-bold text-3xl mb-3 text-slate-800">Kenapa Memilih Well<span className="text-sky-600">Eat</span>?</h1>
           <ul className="flex flex-col list-disc px-4">
             {
              list.map((el,index) => (
                <li key={index} className="text-slate-700 py-2"> <span className="font-bold text-slate-800">{el.title} :</span> {el.description}</li>
              ))
             }
             </ul>
        </div>
          <div className="w-full sm:w-[48%]">
             <img src="./img/reaction.jpg" alt="Why WellEat" />
          </div>
      </div>
      </div>
    </>
  )
}

export default WhyWellEat;