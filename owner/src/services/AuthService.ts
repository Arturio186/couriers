import $api from "../http";
import { AxiosResponse } from 'axios';
import { AuthResponse } from "#interfaces/response/AuthResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/user/login', { email, password })
    }

    static async registration(name: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/user/registration', { name, email, password, role: "owner" })
    }

    static async logout(): Promise<void> {
        return $api.post('/user/logout')
    }
}