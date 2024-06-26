import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Comment, CommentSchema } from "src/schemas/comment.schema";


@Module({
    imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])],
    controllers: [],
    providers: [CommentService],
    exports: [CommentService],
})
export class CommentModule {}