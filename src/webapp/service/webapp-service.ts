import { Injectable, Req } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { WebappConfigService } from '../config/webapp-config.service';
import { getDefaultUsers } from '../constants/webapp-query-constants';

@Injectable()
export class WebappService {
  constructor(
    private readonly webappConfigService: WebappConfigService,
    private readonly logger: Logger,
  ) {}

  public getDefaultUsers(@Req() request?): any {
    const query = getDefaultUsers;
    return this.webappConfigService.getChiefgullDomain(request).request(query);
  }
}
