import { HttpException, Injectable } from "@nestjs/common";
import { UserService } from "../users/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { AccessTokenReturn, RegisterCredentials } from "src/types/auth";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signIn(email: string, password: string): Promise<AccessTokenReturn> {
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new HttpException({
                status: 404,
                success: false,
                messages: ["User not found"],
                data: [],
            }, 200);
        }
        if (!bcrypt.compare(password, user.password)) {
            throw new HttpException({
                success: false,
                messages: ["Password is incorrect"],
                data: [],
                status: 400,
            }, 200);
        }
        const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(user: RegisterCredentials): Promise<AccessTokenReturn> {
        const { name, email, password } = user;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userService.create({
            name,
            email,
            password: hashedPassword,
            role: "user",
        });
        const payload = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        }
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }

    async profile (id: string) {
        const user = await this.userService.findUserById(id);
        return user
    }

}