import {
  Body,
  CacheTTL,
  Controller,
  Get,
  HttpStatus,
  Param, Post,
  Req,
  Res,
} from '@nestjs/common';
import { WebappConfigService } from '../config/webapp-config.service';
import { Response } from 'express';
import {getDefaultUsers, getDefaultUsersbyID, getProducts, getProductsByID} from '../constants/webapp-query-constants';
import {WebappService} from "../service/webapp-service";
import {ProductSaveModel} from "../models/product.model";

@Controller('v1/webapp')
export class WebappController {
  constructor(
    private readonly webappConfigService: WebappConfigService,
    private readonly webappService: WebappService,
  ) {}

  @Get('/getDefaultUsers')
  @CacheTTL(60)
  async getDefaultUsers(
      @Param() params,
      @Req() request?,
      @Res() response?: Response,
  ) {
    const result = await this.webappConfigService
        .getChiefgullDomain(request)
        .request(getDefaultUsers);
    return response.status(HttpStatus.OK).send(result);
  }

  @Get('/getDefaultUsers/:id')
  @CacheTTL(60)
  async getDefaultUserID(
    @Param() params,
    @Req() request?,
    @Res() response?: Response,
  ) {
    if (!isNaN(params?.id)) {
      const result = await this.webappConfigService
        .getChiefgullDomain(request)
        .request(getDefaultUsersbyID, { id: params.id});
      return response.status(HttpStatus.OK).send(result);
    } else {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('Please enter valid ID');
    }
  }

  @Get('/getAllProducts')
  @CacheTTL(60)
  async getAllProducts(
      @Param() params,
      @Req() request?,
      @Res() response?: Response,
  ) {
    const result = await this.webappConfigService
        .getChiefgullDomain(request)
        .request(getProducts);
    const final_result = Object.values(result)[0];
    return response.status(HttpStatus.OK).send(final_result);
  }

  @Get('/getProduct/:id')
  @CacheTTL(60)
  async getProductsByID(
      @Param() params,
      @Req() request?,
      @Res() response?: Response,
  ) {
    if (!isNaN(params?.id)) {
      const result = await this.webappConfigService
          .getChiefgullDomain(request)
          .request(getProductsByID, { id: params.id});
      const final_result = Object.values(result)[0][0];
      return response.status(HttpStatus.OK).send(final_result);
    } else {
      return response
          .status(HttpStatus.BAD_REQUEST)
          .send('Please enter valid ID');
    }
  }

  @Post('/saveProduct')
  @CacheTTL(60)
  async saveProductToDB(
      @Body() productSaveModel: ProductSaveModel,
      @Req() request?,
      @Res() response?: Response,
  ){

    const status = this.webappService.validateProductSaveModel(productSaveModel,);
    if (status === true){
      try {
        await this.webappService.saveProductDetails(request, productSaveModel,);
        return response.status(HttpStatus.OK).send({status: 'Successfully Inserted the Product'});
      } catch (err){
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
      }
    } else {
      return response.status(HttpStatus.BAD_REQUEST).send(status);
    }
  }
}
