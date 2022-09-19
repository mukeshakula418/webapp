import { Injectable, Req } from '@nestjs/common';
import { Logger } from 'nestjs-pino'
import { GraphQLClient } from 'graphql-request/dist';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WebappConfigService {
  private readonly chiefgullDomain;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    this.chiefgullDomain = new GraphQLClient(
      configService.get<string>('WEBAPP_API_ENDPOINT'),
    );
  }

  public getChiefgullDomain(@Req() request): GraphQLClient {
    this.logger.log('URL', this.chiefgullDomain);
    const headers = {
      'const-type': request.headers['content-type'],
      'x-harusa-role': request.headers['x-harusa-role'],
    };
    this.chiefgullDomain.setHeaders(headers);
    console.log(this.chiefgullDomain);
    return this.chiefgullDomain;
  }
}
