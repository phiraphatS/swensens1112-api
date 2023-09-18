import { Body, Controller,  Request, HttpException, HttpStatus, Post, Res, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async Register (@Body() body: any, @Res() response) {
    try {
      const res = await this.userService.registerProcess(body)
      
      return response.status(HttpStatus.OK).json(res)
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async create(@Body() body: any, @Res() response) {
    try {
      const { email, password } = body
      const user = await this.userService.validateProcess(email, password)
      if ( !user ) {
        return response.status(HttpStatus.OK).json({
          message: 'ไม่พบข้อมูลผู้ใช้งาน',
          status: false,
          results: null
        })
      }
      const res = await this.userService.loginProcess(user.id)
      
      return response.status(HttpStatus.OK).json(res)
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }
}
