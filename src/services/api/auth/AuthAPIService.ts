import axios from 'axios'
import { LoginRequestBody, LoginResponse } from '../../../interfaces/auth'

const AuthAPIService = {
    login: function(requestBody: LoginRequestBody) {
        return axios.post<LoginResponse>(`${import.meta.env.VITE_LOGIN}`, requestBody)
    },
    logout: function(){
        return localStorage.removeItem("token");
    }

}

export default AuthAPIService