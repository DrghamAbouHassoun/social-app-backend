import { Request } from "express";

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}

export interface AccessTokenReturn {
    access_token: string;
}

export interface RequestWithUser extends Request {
    user: {
        _id: string;
        name: string;
        email: string;
        role: string;
    }
}