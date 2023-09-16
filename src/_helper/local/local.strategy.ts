import { Strategy } from 'passport-local'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super()
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.userService.validateProcess(email, password);
        if (!user) {
            return {};
        }
        return user;
    }
}