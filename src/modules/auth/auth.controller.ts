import { StaticFileService } from './../staticfiles/staticfile.service';
import { Controller, Body, Post, HttpCode, HttpStatus, Get, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginCredentials, RequestWithUser } from "src/types/auth";
import { LoginValidator, RegisterValidator } from "src/validators/auth.validator";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("auth")
export class AuthController {
    constructor (
        private authService: AuthService,
        private staticFileService: StaticFileService,
    ) {};

    /**
    Login a user
    @param loginCredentials user's login credentials
    @returns a user object if login is successful, an error otherwise
    */
    @Post("/login")
    @HttpCode(HttpStatus.OK)
    async login (@Body() loginCredentials: LoginValidator) {
        return await this.authService.signIn(loginCredentials.email, loginCredentials.password)
    }

    /**
     * Registers a new user.
     *
     * @param registerCredentials - The user's registration credentials.
     * @returns A promise that resolves to the newly created user object if registration is successful,
     *          or rejects with an error if registration fails.
     *
     * @remarks
     * This method takes the user's registration credentials as input, validates them,
     * and then creates a new user in the database.
     *
     * @example
     * ```typescript
     * const registerCredentials: RegisterValidator = {
     *   name: 'John Doe',
     *   email: 'johndoe@example.com',
     *   password: 'password123'
     * };
     *
     * authController.register(registerCredentials)
     *  .then(user => console.log('User registered:', user))
     *  .catch(error => console.error('Registration failed:', error));
     * ```
     */
    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    async register (@Body() registerCredentials: RegisterValidator) {
        return await this.authService.register({ 
            name: registerCredentials.name, 
            email: registerCredentials.email, 
            password: registerCredentials.password
        })
    }

    /**
     * Retrieves the user's profile information.
     *
     * @param req - The request object containing the user's information.
     * @returns The user's profile information.
     *
     * @remarks
     * This method is decorated with `@UseGuards(AuthGuard)` to ensure that only authenticated users can access this endpoint.
     * The user's ID is extracted from the request object and used to fetch the user's profile information from the database.
     *
     * @example
     * ```typescript
     * // Assuming req is a RequestWithUser object with a valid user._id
     * const profile = authController.getProfile(req);
     * console.log('User profile:', profile);
     * ```
     */
    @UseGuards(AuthGuard)
    @Get("/profile")
    getProfile(@Req() req: RequestWithUser) {
        return this.authService.profile(req.user._id);
    }

    /**
     * Retrieves the user's profile files.
     *
     * @param req - The request object containing the user's information.
     * @returns A promise that resolves to the user's profile files if successful,
     *          or rejects with an error if retrieval fails.
     *
     * @remarks
     * This method is decorated with `@UseGuards(AuthGuard)` to ensure that only authenticated users can access this endpoint.
     * The user's ID is extracted from the request object and used to fetch the user's profile files from the database.
     *
     * @example
     * ```typescript
     * // Assuming req is a RequestWithUser object with a valid user._id
     * const profileFiles = await authController.getFiles(req);
     * console.log('User profile files:', profileFiles);
     * ```
     */
    @UseGuards(AuthGuard)
    @Get("/profile/files")
    async getFiles (@Req() req: RequestWithUser) {
        return this.staticFileService.getFilesByUserId(req.user._id);
    }
}