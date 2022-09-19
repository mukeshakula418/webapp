import { CacheKey, CacheTTL, Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/Check1')
  @CacheKey('Check1')
  @CacheTTL(60)
  async check1(
    @Query('search') search: string,
    @Query('search1') search1: string,
  ): Promise<any> {
    await new Promise((r) => setTimeout(r, 3000));
    return { search, search1 };
  }
}
