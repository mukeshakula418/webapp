import {ArgumentsHost, Catch, HttpException} from "@nestjs/common";
import {BaseExceptionFilter} from "@nestjs/core";
import {GqlArgumentsHost, GqlExceptionFilter} from "@nestjs/graphql";

@Catch(HttpException)
export class HttpExceptionFilter
    extends BaseExceptionFilter
    implements GqlExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const gqlHost = GqlArgumentsHost.create(host);
        super.catch(exception, host);
    }
}

@Catch()
export class AllExceptionFilter implements GqlExceptionFilter{
    catch(exception: any, host: ArgumentsHost): any {
        GqlArgumentsHost.create(host);
        return exception;
    }
}