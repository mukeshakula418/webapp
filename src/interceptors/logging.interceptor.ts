import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {Logger} from "nestjs-pino";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class LoggingInterceptor implements NestInterceptor{
    constructor(private readonly logger: Logger) {}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const now = Date.now();
        const req = context.switchToHttp().getRequest();
        if (req){
            const method = req.method;
            const url = req.url;
            return next
                .handle()
                .pipe(
                    tap(()=>
                            this.logger.log(
                                `${method} ${url} ${Date.now() - now}ms`,
                                context.getClass().name,
                                ),
                        ),
                    );
        } else {
            // GRAPHQL interception
            const ctx: any = GqlExecutionContext.create(context);
            const resolverName = ctx.constructorRef.name;
            const info = ctx.getInfo();
            return next.handle().pipe(
                tap(() =>
                    this.logger.log(`${info.parentType} "${info.fieldName}" ${Date.now() - now}ms`,
                        resolverName,
                    ),
                ),
                catchError((err) => {
                    this.logger.error(
                        `${ctx.getContext().req.method} ${
                            ctx.getContext().req.headers['referer']
                        } ${ctx.getContext().req.reqId} ${resolverName} ${JSON.stringify(
                            ctx.getArgs(),
                        )} ${err} ${Date.now() - now}ms`,
                    );
                    return throwError(err);
                }),
            );
        }
    }
}