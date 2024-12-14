import { HttpException, Injectable, Logger } from "@nestjs/common";
import amqp, { ChannelWrapper } from "amqp-connection-manager";
import { Channel } from "amqplib";

@Injectable()
export class ProducerService {
  private channelWrapper: ChannelWrapper;
  constructor() {
    const connection = amqp.connect(["amqp://localhost"]);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue("emailQueue", { durable: true });
      }
    })
  }

  async addToEmailQueue(mail: any) {
    try {
      await this.channelWrapper.sendToQueue(
        "emailQueue",
        Buffer.from(JSON.stringify(mail)),
        {
          persistent: true,
        }
      )
      Logger.log("Sent to Queue");
    } catch (error) {
      throw new HttpException({
        success: false,
        message: ["Something went wrong"],
        status: 500,
        data: [],
        error,
      }, 200)
    }
  }
}