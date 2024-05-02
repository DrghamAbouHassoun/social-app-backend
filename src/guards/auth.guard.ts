import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import globalConstants from "src/config/constants";
import extractTokenFromHeader from "src/utils/extractTokenFromHeader";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = extractTokenFromHeader(request);
        if (!token) {
            throw new HttpException({
                success: false,
                messages: ["Not authorized"],
                status: 403,
                data: null,
            }, 200)
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: globalConstants.jwtSecret,
                }
            );
            request["user"] = payload;
        } catch (error) {
            throw new HttpException({
                success: false,
                messages: ["Not authorized"],
                status: 403,
                data: null,
            }, 200)
        }
        return true;
    }
}