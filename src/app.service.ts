import {
  BadRequestException,
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRegister } from 'src/users/model/userRegister.interface';
import { MailService } from './mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Users') private readonly UserModel: Model<UserRegister>,
    private mailService: MailService,
    private readonly JwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
  async register(user: any) {
    const { email, password, userType } = user;
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Please enter valid email');
    }
    if (email && password && userType) {
      try {
        const userExists = await this.UserModel.findOne({
          email: email,
        }).exec();
        if (userExists) {
          throw new UnauthorizedException("User already registered with this email");
        }
        const token = await this.JwtService.sign({ email: user.email });
        await this.mailService.sendUserConfirmation(user, token);
        const hash = await bcrypt.hash(password, 10);
        const newUser = new this.UserModel({ email, password: hash, userType });
        const result = await newUser.save();   
        return result;
      } catch (error) {
        console.log(error);
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: error.message,
          },
          HttpStatus.FORBIDDEN,
        );
      }
    } else {
      throw new BadRequestException();
    }
  }

  async verifyUser(user, username) {
    if (user && username) {
      try {
        const update = await this.UserModel.findOneAndUpdate(
          { email: user.email },
          { status: true, username: username },
        );
        update.save();
        return update;
        // return "ok"
      } catch (error) {
        console.log(error);
        throw new HttpException(
          {
            status: HttpStatus.NOT_ACCEPTABLE,
            error: 'Invalid Token',
          },
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
    } else {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'User already registered with this email',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
