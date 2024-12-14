import { MailerModule } from "@nestjs-modules/mailer";
import { Global, Module } from "@nestjs/common";
import { EmailService } from "./email.service";
import { EmailController } from "./controller";


@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        // secure: false,
        auth: {
          user: "sam2001winchester@gmail.com",
          pass: "fymi vkrv rstr fcps",
        },
        tls: {
          rejectUnauthorized: false,
        }
      },
      defaults: {
        from: '"Samuel Winchester" <sam2001winchester@gmail.com>',
      }
    }),
  ],
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule { }