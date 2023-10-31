import axios from "axios";
import { AuthService } from "../services/auth/AuthService";
import globalRouter from "./globalNavigate";



export const interceptorInit = () => {
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
            if(error.response.status === 401){
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }
    )    
}
