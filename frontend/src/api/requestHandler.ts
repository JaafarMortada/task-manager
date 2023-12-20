import axios, { AxiosRequestConfig } from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/";

interface RequestOptions {
    method?: AxiosRequestConfig["method"];
    route: string;
    body?: any;
    includeHeaders?: boolean;
    customHeaders?: Record<string, string>;
}

export const requestHandler = async ({
    method = "GET",
    route,
    body,
    includeHeaders = true,
    customHeaders,
}: RequestOptions) => {
    if (!route) throw new Error("URL required");

    axios.defaults.headers.authorization = includeHeaders
        ? `Bearer ${localStorage.getItem("token")}`
        : "";

    try {
        const response = await axios.request({
            method,
            url: route,
            data: body,
            headers: {
                ...(includeHeaders && { 'Content-Type': 'application/json' }), 
                ...customHeaders,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};
