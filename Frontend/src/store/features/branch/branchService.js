import axios from "axios";

//Add new branch
const addBranch = async (inputValues) => {
    try {
      const axiosRespons = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/branch`,
        inputValues,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return axiosRespons.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.messagae ||
        "Something Went Wrong!!!";
      console.log(errorMessage);
      return Promise.reject(errorMessage);
    }
  };

   //Fetch ALL Branches data from DB
const allBranches = async () => {
  try {
    const axiosRespons = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/branch`,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return axiosRespons.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.messagae ||
      "Something Went Wrong!!!";
    //console.log(errorMessage);
    return Promise.reject(errorMessage);
  }
};

const SingleBranch = async (branchId) => {
  try {
    const axiosRespons = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/branch/${branchId}`,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return axiosRespons.data;   
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.messagae ||
      "Something Went Wrong!!!";
    //console.log(errorMessage);
    return Promise.reject(errorMessage);
  }
};

//Create PRoduct functionality using redux
const updateBranch = async ({inputValues , branchId}) => {
  try {
    const axiosRespons = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/branch/${branchId}`,
      inputValues ,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return axiosRespons.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.messagae ||
      "Something Went Wrong!!!";
    return Promise.reject(errorMessage);
  }
};



//Delete Branch functiona used in slice
const deleteBranch = async (branchId) => {
  try {
    const axiosRespons = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/branch/${branchId}`,

      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return axiosRespons.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.messagae ||
      "Something Went Wrong!!!";
    //console.log(errorMessage);
    return Promise.reject(errorMessage);
  }
};



  const branchService = {
    addBranch,
    allBranches,
    deleteBranch,
    SingleBranch,
    updateBranch
  };
  
  export default branchService;