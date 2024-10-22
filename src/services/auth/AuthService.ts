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

}