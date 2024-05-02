import { HttpException, Module } from "@nestjs/common";
import { ImageController } from "./images.controller";
import { MulterModule } from "@nestjs/platform-express";
import { postsStorage, storage } from "src/config/storage";

@Module({
    imports: [MulterModule.register({
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
      }),],
    providers: [],
    controllers: [ImageController],
    exports: [],
})
export class ImageModule {}