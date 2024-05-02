import { HttpException, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StaticFile, StaticFileSchema } from "src/schemas/staticfile.schema";
import { StaticFileController } from "./staticfile.controller";
import { StaticFileService } from "./staticfile.service";
import { MulterModule } from "@nestjs/platform-express";
import { fileStorage } from "src/config/storage";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: StaticFile.name, schema: StaticFileSchema }]),
        MulterModule.register({
            preservePath: true,
            fileFilter: (req, file, callback) => {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4|mov|AVI|pdf)$/)) {
                    return callback(new HttpException({
                        status: 400,
                        messages: ["Only image files are allowed!"]
                    }, 200), false);
                }
                callback(null, true);
            },
            storage: fileStorage,
        }),
    ],
    controllers: [StaticFileController],
    providers: [StaticFileService],
    exports: [StaticFileService]
})
export class StaticFilesModule {}