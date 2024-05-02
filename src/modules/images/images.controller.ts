import { Controller, HttpException, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { storage } from "src/config/storage";

@Controller("/images")
export class ImageController {
    @Post("/upload")
    @UseInterceptors(FileInterceptor("file"))
    uploadFile (@UploadedFile() file: Express.Multer.File) {
        console.log(file);
        return {
            filename: file.filename,
            mimetype: file.mimetype,
        }
    }
}