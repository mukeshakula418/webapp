import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger} from "nestjs-pino";
import {GlobalExceptionFilter} from 'nestjs-exceptions'
import {ValidationPipe} from "@nestjs/common";
import {LoggingInterceptor} from "./interceptors/logging.interceptor";

const sendInternalServerErrorCause = true;
const logAllErrors = true;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor(app.get(Logger)));
  app.useGlobalFilters(
      new GlobalExceptionFilter(sendInternalServerErrorCause, logAllErrors),
  )
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
