import mongoose from "mongoose";

export interface ReturnUserInfo {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    role: string;
}

export interface CreateUser {
    name: string;
    email: string;
    password: string;
    role: string;
}