export const fetchData = (setData, setLoad, getData) => {
  try {
    const getResult = async () => {
      const data = await getData();
      console.log("🚀 ~ getResult ~ data:", data);

      setData(data.data);
    };
    getResult();
  } catch (error) {
    console.log(error);
  } finally {
    setLoad(false);
  }
};

export const postData = (setLoad, sendData) => {
  try {
    const postResult = async () => {
      await sendData();
    };
    postResult();
  } catch (error) {
    console.log(error);
  } finally {
    setLoad(false);
  }
};

export const postingData = (sendData) => {
  try {
    const postResult = async () => {
      const response = await sendData();
      console.log("🚀 ~ postResult ~ response:", response);
    };

    postResult();
  } catch (error) {
    console.log(error);
  }
};
export const fetchingData = (setData, getData) => {
  try {
    const getResult = async () => {
      const data = await getData();
      console.log("🚀 ~ getResult ~ data:", data);

      setData(data);
    };
    getResult();
  } catch (error) {
    console.log(error);
  }
};
