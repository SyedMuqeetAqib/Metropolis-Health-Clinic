import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './model/users.interface';


@Injectable()
export class UsersService {
    constructor(@InjectModel('Users') private readonly UserModel: Model<User>) {}   

    async findOne(email : string):Promise< User| undefined>{
        try {
            const result = await this.UserModel.findOne({ email: email }).exec();
            if (!result) {
              throw new NotFoundException('User Not Found...');
            }
            return result;
            // {
            //   id: result._id,
            //   name: result.name,
            //   age: result.age,
            //   about: result.about,
        // }
          } catch (error) {
            console.log(error);
            throw new NotFoundException('User Not Found');
          }
    }
}
