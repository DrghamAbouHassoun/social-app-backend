import { Request } from "express";

/**
 * Extracts the token from the Authorization header of an HTTP request.
 *
 * @param request - The Express request object containing the headers.
 * @returns The extracted token if the Authorization header is present and starts with "Bearer", otherwise returns `undefined`.
 *
 * @example
 * ```typescript
 * import { Request } from "express";
 * import extractTokenFromHeader from "./extractTokenFromHeader";
 *
 * const req: Request = {
 *   headers: {
 *     authorization: "Bearer abc123"
 *   }
 * };
 *
 * const token = extractTokenFromHeader(req);
 * console.log(token); // Output: "abc123"
 * ```
 */
const extractTokenFromHeader = (request: Request): string => {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === "Bearer" ? token : undefined;
}

export default extractTokenFromHeader;