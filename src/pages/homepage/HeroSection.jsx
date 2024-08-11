const HeroSection = () => {
  return (
    <>
      <div className="pt-6">
        <div
          className="w-full relative font-poppins"
          style={{ overflowX: "hidden" }}
        >
          <div className="mx-2 sm:mx-6">
            <img
              src={`https://images.unsplash.com/photo-1475332363216-323c9b7f1e81?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
              alt="Image"
              className="w-full h-[300px] object-cover rounded-lg"
            />
          </div>
          <div className="absolute top-0 bottom-0 left-2 right-2 sm:left-6 sm:right-6 bg-black opacity-50 rounded-lg"></div>
          <div className="absolute top-0 bottom-0 left-2 right-2 sm:left-6 sm:right-6 flex items-center justify-center text-white flex-col">
            <h2 className=" text-3xl font-bold text-center px-3">
              Selamat Datang di WellEat
            </h2>
            <p className="px-8 text-center text-white">
              Temukan resep sehat dan lezat untuk menunjang kesehatan anda!
              Nikmati setiap hidangan yang tidak hanya memanjakan lidah, tetapi
              juga memberikan nutrisi yang dibutuhkan tubuh, sehingga anda dapat
              menjalani hari hari dengan penuh energi dan kesehatan optimal
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
