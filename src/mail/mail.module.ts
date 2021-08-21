import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService)=>({
        transport: {
          service:process.env.SERVICE,
          secure: false,
          auth: {
            user: process.env.MAIL_EMAIL,
            pass: process.env.MAIL_PASSWORD,
          },
        },
        defaults: {
          from: '"No Reply" <noreply@example.com>',
        },
      })
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}