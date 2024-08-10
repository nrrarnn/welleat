const AboutUs = () => {
  return(
    <>
    <div className="w-full py-20 flex flex-col sm:flex-row items-center justify-center px-6 sm:px-36 font-poppins">
  <div className="flex flex-col w-full sm:w-[49%] mt-5 sm:mt-0 justify-center items-center ">
    <img
      src="./img/recipe.png"
      alt="Image"
      className="w-[400px] object-cover"
    />
  </div>
  <div className="flex flex-col w-full sm:w-[49%] justify-center">
    <h1 className="text-3xl font-bold text-slate-800 mb-5">Tentang Kami</h1>
    <p>
      WellEat adalah platform inovatif yang dirancang
      khusus untuk memberikan informasi terpercaya tentang resep makanan sehat.
      Misi kami adalah membantu Anda menemukan dan menyimpan resep favorit
      yang tidak hanya lezat tetapi juga menyehatkan.
    </p>
  </div>
</div>


    </>
  )
}

export default AboutUs;