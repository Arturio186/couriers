import { AxiosResponse } from 'axios';
import $api from "../http";

import { AuthResponse } from "#interfaces/response/AuthResponse";
import IUser from "#interfaces/IUser";

export default class AuthService {
    static async Login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/user/login', { email, password })
    }

    static async Registration(name: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/user/registration', { name, email, password, role: "owner" })
    }

    static async Logout(): Promise<void> {
        return $api.post('/user/logout')
    }

    static async EditProfile(first_name: string, last_name: string, email: string): Promise<AxiosResponse<IUser>> {
        return $api.patch('/user/edit-profile', {
            first_name,
            last_name,
            email
        })
    }

    static async UpdatePassword(old_password: string, new_password: string): Promise<AxiosResponse<string>> {
        return $api.patch('/user/update-password', {
            old_password,
            new_password
        })
    }

    static async DeleteAccount(password: string): Promise<AxiosResponse<string>> {
        return $api.delete('/user/delete-account', {
            data: {
                password
            }
        })
    }

    static async GetUserInfo(): Promise<AxiosResponse<IUser>> {
        return $api.get('/user')
    }
}