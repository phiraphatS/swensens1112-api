import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...require('../typeorm.config'),
      entities: [
        User
      ],
    }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
