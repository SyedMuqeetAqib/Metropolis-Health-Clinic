import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { AppointmentsController } from './appointments/appointments.controller';
import { TreatmentModule } from './treatment/treatment.module';
import { TreatmentController } from './treatment/treatment.controller';
import { DashboardController } from './dashboard/dashboard.controller';
import { MailModule } from './mail/mail.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
    MailModule, JwtModule.registerAsync({
        useFactory: (config: ConfigService) => {
          return {
            secret: config.get<string>('JWTSECRET'),
            signOptions: {
              expiresIn: '30m',
            },
          };
        },
        inject: [ConfigService],
  }),
    UsersModule,  MongooseModule.forRoot('mongodb+srv://12345:12345@cluster0.rnd3j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{ useFindAndModify: false }), AuthModule, DashboardModule, AppointmentsModule, TreatmentModule, MailModule],
  controllers: [AppController, AppointmentsController, TreatmentController, DashboardController],
  providers: [AppService],
})
export class AppModule {}
