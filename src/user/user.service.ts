import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


const is_active = { is_active: 1, is_delete: 0 }
@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async loginProcess(email: string, password: string) {
    try {
      const hashedPassword = bcrypt.hashSync(password, 10)
      const resUser = await this.UserRepository.findOneBy({ email: email, ...is_active })

      if (resUser) {
        let isValidate = await bcrypt.compare(password, resUser.password);
        if (resUser && isValidate) {
          const { password, ...result } = resUser;
          return result;
        }
      }

      const results = {
        message: 'ไม่พบผู้ใช้งาน',
        status: false,
        results: null
      }

      return results

    } catch (error) {
      throw new HttpException({
        status: false,
        message: error.message,
        results: null
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async registerProcess(user: any, form: any) {
    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()
    try { 
      const hashedPassword = bcrypt.hashSync(form.password, 10);
      const checkEmail = await this.UserRepository.findOneBy({ email: form.email, ...is_active })
      if (checkEmail) {
        return {
          status: false,
          message: 'อีเมลนี้ถูกใช้แล้ว',
          results: null
        }
      }

      const newDate = new Date()
      const newUser = this.UserRepository.create()
      
      newUser.email = form.email
      newUser.last_name = form.last_name
      newUser.gender_id = form.gender_id
      newUser.birth_date = form.birth_date
      newUser.agree_news = form.agree_news
      newUser.first_name = form.first_name
      newUser.phone_number = form.phone_number
      newUser.password = hashedPassword
      newUser.is_active = 1
      newUser.is_delete = 0
      newUser.is_admin = 0
      newUser.created_at = newDate
      newUser.created_by = user.id
      newUser.updated_at = newDate
      newUser.updated_by = user.id

      const saveUser = await queryRunner.manager.save(newUser)
      await queryRunner.commitTransaction()
      const results = {
        message: 'success',
        status: true,
        results: null
      }

      return results
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new HttpException({
        status: false,
        message: error.message,
        results: null
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      await queryRunner.release()
    }
  }

  
}
