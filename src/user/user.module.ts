import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LogUser } from 'src/entities/log_user.entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '7 days' },
        }
      }
    }),
    TypeOrmModule.forFeature([
      User,
      LogUser,
    ]),
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserService,
  ],
})
export class UserModule {}
