import { AxiosHeaders, AxiosRequestConfig } from "axios";
import { LoginRequestBody } from "../../interfaces/auth";
import AuthAPIService from "../api/auth/AuthAPIService";

export const AuthService = {
    getToken: function() {
        return localStorage.getItem('token');
    },

    login: async function(login: string, password: string) {
        try {
            const requestBody: LoginRequestBody = { id: login, password : password}
            localStorage.setItem("token", (await AuthAPIService.login(requestBody)).data.token);
            return true;
        }
        catch {
            return false;
        }
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