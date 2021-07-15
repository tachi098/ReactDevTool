import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/api/employee",
    headers: {
        "Content-Type": "application/json"
    }
})