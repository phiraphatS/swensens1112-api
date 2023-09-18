import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogUser } from 'src/entities/log_user.entity';
import { User } from 'src/entities/user.entity';
import { FilesUpload } from 'src/entities/files_upload.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      LogUser,
      FilesUpload,
    ]),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
