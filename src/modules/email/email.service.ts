import { MailerService } from "@nestjs-modules/mailer";
import { HttpException, Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) { }

  async sendEmail(options: { email: string; subject: string; html: string }) {
    try {
      const message = {
        to: options.email,
        subject: options.subject,
        html: options.html,
      };
      const emailSend = await this.mailerService.sendMail({ ...message });
      return emailSend
    } catch (error) {
      console.log(error);
      throw new HttpException({
        success: false,
        messages: ["Something went wrong"],
        data: [],
        error: error,
        stuats: 500,
      }, 200)
    }
  }
}