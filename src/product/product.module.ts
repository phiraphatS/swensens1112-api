import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesUpload } from 'src/entities/files_upload.entity';
import { LogUser } from 'src/entities/log_user.entity';
import { User } from 'src/entities/user.entity';
import { Product } from 'src/entities/product.entity';
import { ProdCategory } from 'src/entities/prod_category.entity';
import { Category } from 'src/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      LogUser,
      FilesUpload,
      Product,
      ProdCategory,
      Category,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
