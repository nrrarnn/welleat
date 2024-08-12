import { IoMdAdd } from "react-icons/io";
import ListRecipes from "./ListRecipes";
import { useEffect, useState } from "react";
import axios from "axios";

const ManajemenRecipes = () => {
  const [listRecipes, setListRecipes] = useState([])
  const getRecipes = async () => {
    try {
      const response = await axios.get("https://66b8371e3ce57325ac76a51a.mockapi.io/api/v1/recipelist");
      setListRecipes(response.data)
      console.log(response.data) 

    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getRecipes()
  },[])
  return(
    <>
      <div className="p-8 font-poppins">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-slate-800 text-2xl">Daftar Resep</h1>
            <p className="text-slate-600 text-sm">Lihat informasi mengenai resep</p>
          </div>
          <button className="flex items-center ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg">
            <IoMdAdd className="mr-2" /> Add
          </button>
       </div>
      </div>
    {
      listRecipes.map((recipe,index) => (
        <ListRecipes key={index} name={recipe.name} img={recipe.image} bahan={recipe.bahan}/>
      ))
    }
      

    </>
  )
}

const nameRecipes = [
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur laborum porro autem id doloremque nulla! Totam ad deleniti nam velit.',
  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit exercitationem expedita iure hic natus ut voluptatem asperiores eos unde delectus!',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis possimus magnam nam adipisci. Voluptatibus neque aut tempora, sequi nesciunt sed.',
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, architecto libero voluptatum sit debitis fugit ratione excepturi consectetur enim nisi!'
]

export default ManajemenRecipes;