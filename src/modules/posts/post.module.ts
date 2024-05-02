import { HttpException, Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { postsStorage } from "src/config/storage";
import { PostController } from "./post.controller";
import { UserModule } from "../users/user.module";
import { PostService } from "./post.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "src/schemas/post.schema";
import { CommentModule } from "../comments/comment.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
        UserModule,
        CommentModule,
        MulterModule.register({
        dest: "./upload",
        preservePath: true,
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return callback(new HttpException({
                    status: 400,
                    messages: ["Only image files are allowed!"]
                }, 200), false);
            }
            callback(null, true);
        },
        storage: postsStorage,
      }),
      
    ],
    providers: [PostService],
    controllers: [PostController],
    exports: [],
})
export class PostModule {}