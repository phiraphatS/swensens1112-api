import { Body, Controller,  Request, HttpException, HttpStatus, Post, Res, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/_helper/jwt/jwt-auth.guards';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async Register (@Request() req, @Body() body: any, @Res() response) {
    try {
      const res = await this.userService.registerProcess(req, body)
      
      return response.status(HttpStatus.OK).json(res)
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }

  @Get('login')
  async create(@Body() body: any, @Res() response) {
    try {
      const { email, password } = body
      const res = await this.userService.loginProcess(email, password)
      
      return response.status(HttpStatus.OK).json(res)
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
  }
}
