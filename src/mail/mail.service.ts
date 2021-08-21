import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';


@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user, token: string) {
    const url = `copy and paste this code to register: ${token}`;

    await this.mailerService.sendMail({
        from:"smuqeetaqib@gmail.com",
      to: user.email,
      subject: 'Confirmation Code for Registeration',
     text:url
    });
  }
}