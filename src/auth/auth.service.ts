import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService){}

    async validateUser(email: string, password: string){
        const result = await this.userService.findOne(email);
        const user = result['_doc'];    
        console.log(user)
        const isMatch = await bcrypt.compare(password, user.password);
        if (user && isMatch && user.status){
            const {password,__v, ...rest} = user;
            return rest;
        }
        return null;
    }

    async login(user: any){
        const payload = {id:user._id,email: user.email, username: user.username, userType: user.userType}
        return {
            access_token : this.jwtService.sign(payload)
        }
    }

}
