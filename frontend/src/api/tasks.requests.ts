import { requestHandler } from "./requestHandler";

export interface TaskData {
    title: string;
    description: string;
    stage: number;
    employee_id: number;
    due_date: Date | string;
}

export interface assignedEmployee {
    id: number;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

export interface TaskResponse {
    id: number;
    title: string;
    description: string;
    stage: number;
    due_date: Date;
    created_at: Date;
    updated_at: Date;
    user_id: number;
    assigned_employee: assignedEmployee;
}

interface UpdateTaskData {
    stage: number;
}

export const getTasks = async ():Promise<TaskResponse[] | number | unknown> => {
    try {
        const response = await requestHandler({
            method: "GET",
            route: "tasks/get-all",
        });
        if (response.message === "successfully fetched tasks") {
            return response.tasks;
        }
        return response.status;
    } catch (error) {
        return error;
    }
}

export const addTask =async (data: TaskData): Promise<TaskResponse | number | unknown> => {

    try {
        const response = await requestHandler({
            method: "POST",
            route: "employer/add-task",
            body: data,
        });
        if (response.message === "successfully added task") {
            return response.task;
        } 
        return response.message;
    } catch (error) {
        return error;
    }
}

export const updateTask = async (data: UpdateTaskData, id: number): Promise<boolean> => {
    try {
        const response = await requestHandler({
            method: "POST",
            route: `tasks/edit/${id}`,
            body: data,
        });
        if (response.message === "Task updated successfully") {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}