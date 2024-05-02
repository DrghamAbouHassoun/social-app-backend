import { Request } from "express";

const extractTokenFromHeader = (request: Request): string => {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === "Bearer" ? token : undefined;
}

export default extractTokenFromHeader;