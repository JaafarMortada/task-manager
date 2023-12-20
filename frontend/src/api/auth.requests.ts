import { requestHandler } from "./requestHandler";

export interface signupData {
    name: string;
    email: string;
    password: string;
    role: "employee" | "employer";
}

export interface loginData {
    email: string;
    password: string;
}

export interface authResponse {
    id?: number;
    name: string;
    email: string;
    role: "employee" | "employer";
    token: string;
}

export const signup = async (data: signupData) => {
    try {
        const response = await requestHandler({
            method: "POST",
            route: "auth/register",
            body: data,
        });
        if (response.message === "User created successfully") {
            localStorage.setItem("token", response.user.token);
            localStorage.setItem("role", response.user.role);
            const user: authResponse = response.user
            return user;
        } else return response.status
    } catch (error) {
        return error;
    }
}

export const login = async (data: loginData) => {
    try {
        const response = await requestHandler ({
            method: "POST",
            route: "auth/login",
            body: data,
        })
        if (response.message === 'logged in successfully') {
            localStorage.setItem("token", response.user.token);
            localStorage.setItem("role", response.user.role);
            const user: authResponse = response.user
            return user
        } else return response.status
    } catch (error) {
        return error
    }
}

export const logout = async () => {
    try {
        const response = await requestHandler({
            method: "POST",
            route: "auth/logout",
        })
        if (response.message === "Successfully logged out") {
            localStorage.removeItem("token");
            return true
        } else return false
    } catch (error) {
        return false
    }
}