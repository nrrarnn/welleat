import axios from "axios";

export const baseApi = axios.create({
  baseURL: "https://66b844163ce57325ac76c08b.mockapi.io/",
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
