import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesUpload } from 'src/entities/files_upload.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class FilesService {
  
  constructor(
    private dataSource: DataSource,
    @InjectRepository(FilesUpload)
    private FilesUploadRepository: Repository<FilesUpload>,
  ) {}

  async saveFile(req: any, fileData: Buffer) {
    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()
    try { 

      const newFile = this.FilesUploadRepository.create()
      
      newFile.file_blob = fileData
      newFile.file_raw_name = req.file_name
      newFile.file_size = req.file_size
      newFile.file_mime_type = req.file_mime_type
      newFile.file_ext = req.file_ext
      newFile.file_desc = req.file_desc

      const saveUser = await queryRunner.manager.save(newFile)
      await queryRunner.commitTransaction()

      return newFile.id
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw null
    } finally {
      await queryRunner.release()
    }
  }
}
