import { MdFavoriteBorder } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";


const CardHome = () => {
  const images = [
    {
      img: 'https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_1280.jpg',
      name: 'Salmon '
    },
    {
      img: 'https://images.unsplash.com/photo-1580013759032-c96505e24c1f?q=80&w=1818&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Salad'
    },
    {
      img: 'https://cdn.pixabay.com/photo/2022/02/12/21/22/toast-7009956_1280.jpg',
      name: 'vegan toast'
    },
    {
      img: 'https://cdn.pixabay.com/photo/2017/05/10/17/27/sandwich-2301387_1280.jpg',
      name: 'sandwich'
    },
  ]
  return(
    <>
      <div className="w-full flex justify-center items-center flex-col sm:flex-row px-8 gap-6 mt-10 mb-32 font-poppins">

      {
        images.map((value,index) => (
           <div className="w-[320px] sm:w-[250px] p-1 shadow-md rounded-lg" key={index}>
          <img src={`${value.img}`} alt="Salad Buah" className="w-[320px] sm:w-[250px] h-[150px] rounded-lg object-cover" />
          <div className="flex justify-between items-center py-2">
            <h1>{value.name}</h1>
            <div className="flex gap-2 px-4">
              <MdFavoriteBorder/>
              <FaRegComment/>
            </div>
          </div>
        </div>
        ))
      }
       
        
      </div>
    </>
  )
}

export default CardHome;