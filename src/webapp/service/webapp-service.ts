import { Injectable, Req } from '@nestjs/common';
import { WebappConfigService } from '../config/webapp-config.service';
import {getDefaultUsers, insertProduct} from '../constants/webapp-query-constants';
import {ProductSaveModel} from "../models/product.model";

@Injectable()
export class WebappService {
  constructor(
    private readonly webappConfigService: WebappConfigService,
  ) {}

  public validateProductSaveModel(productSaveModel: ProductSaveModel):boolean | string{
    if (!productSaveModel){
      return 'ProductSaveModel not found';
    } else if (!productSaveModel?.productName){
      return 'Product Name not found'
    } else if (!productSaveModel?.productCode){
      return 'Product Code not found'
    } else if (!productSaveModel?.releaseDate){
      return 'Release Date not found'
    } else if (!productSaveModel?.price){
      return 'Price not found'
    } else if (!productSaveModel?.productDescription){
      return 'productDescription not found'
    } else if (!productSaveModel?.starRating){
      return 'Star Rating not found'
    } else if (!productSaveModel?.imageUrl){
      return 'Image Url not found'
    }
    return true;
  }

  public async saveProductDetails(request, body): Promise<any> {
    const result = await this.webappConfigService.getChiefgullDomain(request).request(insertProduct, {
      object: {
        productId: body.productId,
        productName: body.productName,
        productCode: body.productCode,
        releaseDate: body.releaseDate,
        productDescription: body.productDescription,
        price: body.price,
        starRating: body.starRating,
        imageUrl: body.imageUrl,
      }
    })
    console.log("Result of saveProductDetails after inserting", result);
  }
}
