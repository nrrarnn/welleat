export const fetchData = (setData, setLoad, getData) => {
  try {
    const getResult = async () => {
      const data = await getData();

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
    setLoad(postResult.data);
    console.log("🚀 ~ postData ~ setLoad:", setLoad);
  } catch (error) {
    console.log(error);
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

      setData(data.data);
    };
    getResult();
  } catch (error) {
    console.log(error);
  }
};
