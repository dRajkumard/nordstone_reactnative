import axios from 'axios';

const httpClient = axios.create({ timeout: 2 * 60 * 1000 });
httpClient.defaults.timeout = 10000;

export const fetchApi = async (url, reqdata) => {
  try {
    const response = await httpClient.post(url ,null, { params: reqdata })
    // console.log("api",response.data)
    if(response.data){
      return response.data;
    }else{
      console.log(response.data)
    }
  } catch (error) {
    console.log("apierr",error)
  }
};

export const getApi = async (url) => {
  try {
    const response = await httpClient.get(url)
    // console.log("api",response.data)
    if(response.data){
      return response.data;
    }else{
      console.log(response.data)
    }
  } catch (error) {
    console.log("apierr",error)
  }
};