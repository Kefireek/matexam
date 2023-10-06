import { AxiosHeaders, AxiosRequestConfig } from "axios";
import { LoginRequestBody } from "../../interfaces/auth";
import AuthAPIService from "../api/auth/AuthAPIService";

export const AuthService = {
    getToken: function() {
        return localStorage.getItem('token');
    },

    login: async function(login: string, password: string) {
        const requestBody: LoginRequestBody = { id: login, password : password}
        AuthAPIService.login(requestBody).then((res) => {
            localStorage.setItem("token", res.data.token);
            return true
        });
        return false
    },

    getAuthenticatedConfig: function(config?: AxiosRequestConfig) {
        if(config) {
            config.headers = config.headers ?? new AxiosHeaders();
            config.headers.Authorization = `Bearer ${this.getToken()}`;
        }
        else {
            config = {};
            config.headers = new AxiosHeaders();
            config.headers.setAuthorization(`Bearer ${this.getToken()}`)
        }
        return config
    }
}