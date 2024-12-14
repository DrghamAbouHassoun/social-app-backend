import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import amqp, { ChannelWrapper } from "amqp-connection-manager";
import { EmailService } from "../email/email.service";
import { ConfirmChannel } from "amqplib";

@Injectable()
export class ConsumerService implements OnModuleInit {
  private channelWrapper: ChannelWrapper;
  private readonly logger = new Logger(ConsumerService.name);
  constructor(private emailService: EmailService) {
    const connection = amqp.connect(["amqp://localhost"]);
    this.channelWrapper = connection.createChannel();
  }

  public async onModuleInit() {
    try {
      await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
        await channel.assertQueue("emailQueue", { durable: true });
        await channel.consume("emailQueue", async (message) => {
          if (message) {
            const content = JSON.parse(message.content.toString());
            this.logger.log('Received message:', content);
            await this.emailService.sendEmail(content);
            channel.ack(message);
          }
        })
      })
      this.logger.log("Consumer service started listeing for messages.");
    } catch (error) {
      this.logger.error(error);
    }
  }
}