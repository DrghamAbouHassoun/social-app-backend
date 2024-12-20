import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { UserService } from "./user.service";
import { EmailModule } from "../email/email.module";
import { QueueModule } from "../queues/queue.module";
import { UserController } from "./user.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        EmailModule,
        QueueModule,
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}