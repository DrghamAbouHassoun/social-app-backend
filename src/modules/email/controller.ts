import { Controller, Post } from "@nestjs/common";
import { EmailService } from "./email.service";

@Controller("/email")
export class EmailController {
    constructor(private emailService: EmailService) {};

    @Post("/test")
    async testEmail() {
        await this.emailService.sendEmail({ 
            email: "derghambouhassoun@gmail.com",
            subject: "Test Email",
            html: "<h1>Hello World!</h1>",
        });
        return { message: "Email sent successfully" };
    }
}