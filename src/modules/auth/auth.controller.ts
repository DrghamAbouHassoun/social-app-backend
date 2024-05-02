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

    @Post("/login")
    @HttpCode(HttpStatus.OK)
    async login (@Body() loginCredentials: LoginValidator) {
        return await this.authService.signIn(loginCredentials.email, loginCredentials.password)
    }

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    async register (@Body() registerCredentials: RegisterValidator) {
        return await this.authService.register({ 
            name: registerCredentials.name, 
            email: registerCredentials.email, 
            password: registerCredentials.password
        })
    }

    @UseGuards(AuthGuard)
    @Get("/profile")
    getProfile(@Req() req: RequestWithUser) {
        return this.authService.profile(req.user._id);
    }

    @UseGuards(AuthGuard)
    @Get("/profile/files")
    async getFiles (@Req() req: RequestWithUser) {
        return this.staticFileService.getFilesByUserId(req.user._id);
    }
}