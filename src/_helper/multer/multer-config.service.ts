// multer-config.service.ts
import { Injectable } from '@nestjs/common';
import * as multer from 'multer';

@Injectable()
export class MulterConfigService {
  public multerOptions: multer.Options = {
    dest: './files', // Path where uploaded files will be stored
  };
}
