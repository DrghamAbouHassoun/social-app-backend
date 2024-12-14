/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import globalConstants from "src/config/constants";
import { ROLES_KEY } from "src/decorators/roles.decorator";
import extractTokenFromHeader from "src/utils/extractTokenFromHeader";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor (
        private reflector: Reflector,
        private jwtService: JwtService,
    ) {}

    async canActivate (context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log(requiredRoles);
        if (!requiredRoles) {
            return true;
        }
        const request: Request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        console.log("Authorization: " + authorization);
        if (!authorization) {
            throw new HttpException({
                success: false,
                messages: ["Not authorized"],
                status: 403,
                data: null,
            }, 200)
        }
        const token = extractTokenFromHeader(request);
        console.log("token: " + token);
        console.log("canActivate");
        if (!token) {
            throw new HttpException({
                success: false,
                messages: ["Not authorized"],
                status: 403,
                data: null,
            }, 200)
        }
        try {
            const payload = await this.jwtService.verifyAsync<{ name: string; email: string; role: "admin" | "user"; }>(
                token,
                {
                    secret: globalConstants.jwtSecret,
                }
            );
            console.log("Payload: ", payload);
            // throw new HttpException({
            //     success: false,
            //     messages: ["Not correct role"],
            //     status: 403,
            //     data: payload,
            // }, 200)
            request["user"] = payload
            if (!requiredRoles.includes(payload.role)) {
                throw new HttpException({
                    success: false,
                    messages: ["Not correct role"],
                    status: 403,
                    data: null,
                }, 200)
            }
            
        } catch (error) {
            throw new HttpException({
                success: false,
                messages: ["Not authorized 2"],
                status: 403,
                data: null,
            }, 200)
        }
        return true;
        // return requiredRoles.some((role) => user.roles?.includes(role));
    }
}