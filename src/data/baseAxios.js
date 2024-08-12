import axios from "axios";

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchData = (setData, setLoad, getData) => {
  try {
    const getResult = async () => {
      const data = await getData();

      setData(data);
    };
    getResult();
    setLoad(false);
  } catch (error) {
    console.log(error);
    setLoad(false);
  }
};
