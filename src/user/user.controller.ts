import { Body, Controller,  Request, HttpException, HttpStatus, Post, Res, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/_helper/jwt/jwt-auth.guards';
import { LocalAuthGuard } from 'src/_helper/local/local-auth.guards';
import { PassportModule } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('register')
  // async Register ( @Body() body: any, @Res() response) {
  //   try {
  //     const res = await this.userService.registerProcess(body)
      
  //     return response.status(HttpStatus.OK).json(res)
  //   } catch (error) {
  //     return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
  //   }
  // }

  // @UseGuards(LocalAuthGuard)
  // @Get('login')
  // async create(@Request() req, @Res() response) {
  //   try {
  //     const user_id = req.id
  //     const res = await this.userService.loginProcess(user_id)
      
  //     return response.status(HttpStatus.OK).json(res)
  //   } catch (error) {
  //     return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error)
  //   }
  // }
}
