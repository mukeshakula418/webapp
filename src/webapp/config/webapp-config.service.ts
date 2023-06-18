import { Injectable, Req } from '@nestjs/common';
import { Logger } from 'nestjs-pino'
import { GraphQLClient } from 'graphql-request/dist';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WebappConfigService {
  private readonly inmonster30;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    this.inmonster30 = new GraphQLClient(
      configService.get<string>('WEBAPP_API_ENDPOINT'),
    );
  }

  public getChiefgullDomain(@Req() request): GraphQLClient {
    this.logger.log('URL', this.inmonster30);
    const headers = {
      'const-type': request.headers['content-type'],
      'x-hasura-admin-secret': request.headers['x-hasura-admin-secret'],
    };
    this.inmonster30.setHeaders(headers);
    return this.inmonster30;
  }
}
