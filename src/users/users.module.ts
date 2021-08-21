import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './model/user.schema';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{name:"Users", schema: UserSchema}])],
  providers: [UsersService],
  controllers: [],
  exports: [UsersService,MongooseModule.forFeature([{name:"Users", schema: UserSchema}])]
})
export class UsersModule {}
