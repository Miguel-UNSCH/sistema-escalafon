import { CustomError } from "@/middleware/errorHandler";

export const BadRequestError = (message: string) => new CustomError(message, 400);

export const UnauthorizedError = (message: string) => new CustomError(message, 401);

export const ForbiddenError = (message: string) => new CustomError(message, 403);

export const NotFoundError = (message: string) => new CustomError(message, 404);

export const ConflictError = (message: string) => new CustomError(message, 409);

export const UnprocessableEntityError = (message: string) => new CustomError(message, 422);

export const TooManyRequestsError = (message: string) => new CustomError(message, 429);

export const InternalServerError = (message: string) => new CustomError(message, 500);

export const NotImplementedError = (message: string) => new CustomError(message, 501);
