import config from "@/config";
import axios from "axios";
import clsx, { ClassValue } from "clsx";
import { cookies } from "next/headers";
import { twMerge } from "tailwind-merge";

const apiService = {
    get: async function (url: string): Promise<any> {
        console.log('get', url)

        return new Promise((resolve, reject) => {
            fetch(`${config.apiUrl}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log('Response: ', json)

                    resolve(json);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },

    post: async function (url: string, data: any): Promise<any> {
        console.log('post', url, data)

        return new Promise((resolve, reject) => {
            fetch(`${config.apiUrl}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log('Response: ', json)

                    resolve(json);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    registerUser: async function (url: string, data: any): Promise<any> {
        console.log('post', url, JSON.stringify(
            {
                email: data.email,
                password: data.password,
                username: data.username
            }
        ))

        return new Promise((resolve, reject) => {
            fetch(`${config.apiUrl}${url}`, {
                method: 'POST',
                body: JSON.stringify(
                    {
                        email: data.email,
                        password: data.password,
                        username: data.username
                    }
                ),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log('Response: ', json)

                    resolve(json);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    logUserIn: async function (url: string, data: any): Promise<any> {
        console.log('post', url, JSON.stringify(
            {
                email: data.email,
                password: data.password,
            }
        ))

        return new Promise((resolve, reject) => {
            fetch(`${config.apiUrl}${url}`, {
                method: 'POST',
                body: JSON.stringify(
                    {
                        email: data.email,
                        password: data.password,
                    }
                ),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log('Response: ', json)

                    resolve(json);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    logout: async function (url: string): Promise<any> {
        console.log('post', url)

        return new Promise((resolve, reject) => {
            fetch(`${config.apiUrl}${url}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log('Response: ', json)

                    resolve(json);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    getUser: async function (url: string): Promise<any> {
        console.log('get', url)

        return new Promise((resolve, reject) => {
            fetch(`${config.apiUrl}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log('Response: ', json)

                    resolve(json);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    },
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export default apiService