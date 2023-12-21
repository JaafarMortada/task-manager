import { requestHandler } from "./requestHandler";


export interface Employee {
    id: number;
    name: string;
    email: string;
    role_id: number;
    created_at: string;
    updated_at: string;
}

export const getEmployees = async (): Promise<Employee[] | unknown> => {
    try {
        const response = await requestHandler({
            method: "GET",
            route: "employer/get-employees",
        });
        if (response.message === "Employees fetched successfully") {
            return response.employees as Employee[];
        }
        return response;
    } catch (error) {
        return error;
    }
}