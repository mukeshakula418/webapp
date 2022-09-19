import {
  CacheTTL,
  Controller,
  Get,
  HttpStatus,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { WebappConfigService } from '../config/webapp-config.service';
import { Response } from 'express';
import { getDefaultUsers } from '../constants/webapp-query-constants';
import {WebappService} from "../service/webapp-service";

@Controller('v1/webapp')
export class WebappController {
  constructor(
    private readonly webappConfigService: WebappConfigService,
    private readonly webappService: WebappService,
    private readonly logger: Logger,
  ) {}

  @Get('/defaultUsers/:id')
  @CacheTTL(60)
  async getDefaultUserID(
    @Param() params,
    @Req() request?,
    @Res() response?: Response,
  ) {
    if (!isNaN(params?.id)) {
      const result = await this.webappConfigService
        .getChiefgullDomain(request)
        .request(getDefaultUsers);
      return response.status(HttpStatus.OK).send(result);
    } else {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('Please enter valid ID');
    }
  }
}
