import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
import { CreateUser, ReturnUserInfo } from "src/types/user";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findUserByEmail(email: string) {
        const user = await this.userModel.findOne({ email: email });
        if (!user) {
            throw new HttpException({
                success: false,
                messages: ["Email not found"],
                status: 404,
                data: [],
            }, 200)
        }
        return user;
    }

    async findUserById(id: string) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new HttpException({
                success: false,
                messages: ["User not found"],
                status: 404,
                data: [],
            }, 200)
        }
        return user;
    }

    async create (user: CreateUser) {
        const newUser = await this.userModel.create({
            name: user.name,
            email: user.email,
            password: await bcrypt.hash(user.password, 10)
        })
        return newUser;
    }
}