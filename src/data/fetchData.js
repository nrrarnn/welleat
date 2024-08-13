export const fetchData = (setData, setLoad, getData) => {
  try {
    const getResult = async () => {
      const data = await getData();

      console.log("🚀 ~ getResult ~ data:", data);
      setData(data.data);
    };
    getResult();
    setLoad(false);
  } catch (error) {
    console.log(error);
    setLoad(false);
  }
};

export const postData = (setLoad, sendData) => {
  try {
    const postResult = async () => {
      await sendData();
    };
    postResult();
    setLoad(false);
  } catch (error) {
    console.log(error);
    setLoad(false);
  }
};
