import axios from "axios";

export const errorInterceptor = () => {
  axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
  )    
};