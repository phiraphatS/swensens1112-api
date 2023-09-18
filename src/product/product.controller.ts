import { Body, Controller, Get, HttpStatus, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post('insert-prod')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    try {
      const { originalname, mimetype, size, buffer } = file;
      const additionalInfo = {
        file_name: originalname,
        file_size: size,
        file_mime_type: mimetype,
        file_ext: '',
        file_desc: '',

        name: body.product_name,
        detail: body.detail,
        price: body.price,
        category_id: body.category_id,
      }

      const fileInfo = await this.productService.insertProduct(additionalInfo, buffer);

      return fileInfo;
    } catch (error) {
      return {
        status: false,
        message: error.message,
        results: null
      }
    }
  }

  @Get('get-product')
  async GetProduct(@Query() queryParams: any, @Res() response) {
    try {
      const { id } = queryParams
      const res = await this.productService.getProduct(id)
      return response.status(HttpStatus.OK).json({
        status: res.status,
        message: res.message,
        results: res.results
      });

    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: error.message,
        results: null
      });
    }
  }

  @Get('get-category')
  async GetCategory(@Query() queryParams: any, @Res() response) {
    try {
      
      const res = await this.productService.getCategory()
      return response.status(HttpStatus.OK).json({
        status: res.status,
        message: res.message,
        results: res.results
      });

    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: error.message,
        results: null
      });
    }
  }

  
  @Post('remove-product')
  async RemoveProduct (@Body() body: any, @Res() response) {
    try {
      const { cate_id, product_id } = body
      const res = await this.productService.removeProduct(cate_id, product_id)
      
      return response.status(HttpStatus.OK).json(res)
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }
  
  @Post('edit-product')
  async EditProduct (@Body() body: any, @Res() response) {
    try {
      const res = await this.productService.edit(body)
      
      return response.status(HttpStatus.OK).json(res)
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  @Post('create-category') 
  async CreateCategory (@Body() body: any, @Res() response) {
    try {
      const res = await this.productService.createCategory(body)
      
      return response.status(HttpStatus.OK).json(res)
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  @Post('remove-category') 
  async RemoveCategory (@Body() body: any, @Res() response) {
    try {
      const { cate_id } = body
      const res = await this.productService.removeCategory(cate_id)
      
      return response.status(HttpStatus.OK).json(res)
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }
}
