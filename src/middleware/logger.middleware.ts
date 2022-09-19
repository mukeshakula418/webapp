import {Injectable, Logger, NestMiddleware} from "@nestjs/common";
import {Request, Response, NextFunction} from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    private readonly logger = new Logger('HTTP');
    createLog = new LogFormat();

    use(request: Request, response: Response, next: NextFunction): any {
        const {method, originalUrl} = request;
        const userAgent = request.get('user-agent') || '';
        const responseCode = response.statusCode;

        this.createLog.info = 'Middleware logs'
        this.createLog.method = method;
        this.createLog.originalUrl = originalUrl;
        this.createLog.userAgent = userAgent;
        this.createLog.responseCode = responseCode;

        this.logger.log(JSON.stringify(this.createLog));
        next();
    }
}

export class LogFormat {
    info: string;
    method: string;
    originalUrl: any;
    userAgent: string;
    responseCode?: number;
}