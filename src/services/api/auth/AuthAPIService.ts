import axios from 'axios'
import { LoginRequestBody, LoginResponse } from '../../../interfaces/auth'

const AuthAPIService = {
    login: async function(requestBody: LoginRequestBody) {
        return axios.post<LoginResponse>(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_LOGIN}`, requestBody)
    }

}

export default AuthAPIService