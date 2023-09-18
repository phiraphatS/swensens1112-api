import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { LogUser } from './entities/log_user.entity';
import { ProdCategory } from './entities/prod_category.entity';
import { FilesUpload } from './entities/files_upload.entity';
import { FilesModule } from './files/files.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...require('../typeorm.config'),
      entities: [
        User,
        Product,
        Category,
        LogUser,
        ProdCategory,
        FilesUpload,
      ],
    }),
    UserModule,
    FilesModule,
    ProductModule,
  ],
  controllers: [
    AppController
  ],
  providers: [AppService],
})
export class AppModule {}
