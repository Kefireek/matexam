import axios from 'axios'
import { LoginRequestBody, LoginResponse } from '../../../interfaces/auth'

const AuthAPIService = {
    login: async function(login: string, password: string) {
        const requestBody: LoginRequestBody = { id: login, password : password}
        return axios.post<LoginResponse>(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_LOGIN}`, requestBody)
    }

}

export default AuthAPIService