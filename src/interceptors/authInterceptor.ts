import axios from "axios";
import { AuthService } from "../services/auth/AuthService";
import globalRouter from "./globalNavigate";



axios.interceptors.request.use(
    config => {
        const token = AuthService.getToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log("essa");
        if(error.response.status === 401){
            window.location.href = "/login", true;
            return Promise.reject(error);
        }
    }
)