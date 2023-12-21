import { requestHandler } from "./requestHandler";


export interface Employee {
    id: number;
    name: string;
    email: string;
    role_id: number;
    created_at: string;
    updated_at: string;
}

export interface EmployeeData {
    name: string;
    email: string;
    password: string;
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

export const addEmployee = async (employee: EmployeeData): Promise<Employee | unknown> => {
    try {
        const response = await requestHandler({
            method: "POST",
            route: "employer/add-employee",
            body: employee,
        });
        if (response.message === "Employee added successfully") {
            return response.employee as Employee;
        }
        return response;
    } catch (error) {
        return error;
    }
}

export const deleteEmployee = async (id: number): Promise<boolean> => {
    try {
        const response = await requestHandler({
            method: "DELETE",
            route: `employer/delete-employee/${id}`,
        });
        if (response.message === "Employee deleted successfully") {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}