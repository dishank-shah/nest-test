import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor() {
        console.log('called middleware called')
    }
    use(request: Request, response: Response, next: NextFunction): void {
        console.log("request", request.originalUrl);
        next();
    }
}