import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {Logger, LoggerModule} from 'nestjs-pino';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql/error';
import { WebappController } from './webapp/controller/webapp.controller';
import { WebappConfigService } from './webapp/config/webapp-config.service';
import { HttpModule } from '@nestjs/axios';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {LoggerMiddleware} from './middleware/logger.middleware';
import {WebappService} from "./webapp/service/webapp-service";
import {PrometheusModule} from "@willsoto/nestjs-prometheus";

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local'],
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   buildSchemaOptions: {
    //     numberScalarMode: 'integer',
    //   },
    //   playground: true,
    //   // installSubscriptionHandlers: false,
    //   // context: ({ req }) => ({ req }),
    //   driver: ApolloDriver,
    //   autoSchemaFile: 'schema.gql',
    //   // useGlobalPrefix: true,
    //   // formatError: (error: GraphQLError) => {
    //   //   const graphQLFormattedError: GraphQLFormattedError = {
    //   //     message: error.extensions.exception.code || error.message,
    //   //   };
    //   //   return graphQLFormattedError;
    //   // },
    // }),
    PassportModule,
    HttpModule,
    PrometheusModule.register(),
  ],
  controllers: [AppController, WebappController],
  providers: [AppService, ConfigService, WebappService, WebappConfigService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
