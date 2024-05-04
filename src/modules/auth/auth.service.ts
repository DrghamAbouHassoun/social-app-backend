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

    /**
     * Authenticates a user by verifying their email and password.
     *
     * @param email - The email of the user trying to sign in.
     * @param password - The password of the user trying to sign in.
     *
     * @throws Will throw a 404 error if the user is not found.
     * @throws Will throw a 400 error if the password is incorrect.
     *
     * @returns An object containing the access token for the authenticated user.
     */
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

    /**
     * Registers a new user by creating a new user record in the database and generating an access token.
     *
     * @param user - The user object containing the name, email, and password of the new user.
     * @throws Will throw a 400 error if the email is already registered.
     * @returns An object containing the access token for the newly registered user.
     */
    async register(user: RegisterCredentials): Promise<AccessTokenReturn> {
        const { name, email, password } = user;

        // Hash the password using bcrypt with a salt of 10 rounds
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user record in the database
        const newUser = await this.userService.create({
            name,
            email,
            password: hashedPassword,
            role: "user",
        });

        // Create a payload object containing the user's information
        const payload = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        }

        // Generate an access token using the JWT service
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }

    /**
     * Retrieves the user profile by their ID.
     *
     * @param id - The unique identifier of the user.
     *
     * @throws Will throw an error if the user is not found.
     *
     * @returns The user object with the specified ID.
     */
    async profile (id: string) {
        const user = await this.userService.findUserById(id);
        return user
    }

}