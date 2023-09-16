import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
// Open code comment to implement authorize
export class JwtAuthGuard extends AuthGuard('jwt') {}