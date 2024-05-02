import { Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { StaticFileService } from "./staticfile.service";
import { AuthGuard } from "src/guards/auth.guard";
import { RequestWithUser } from "src/types/auth";

@Controller("/files")
export class StaticFileController {
    constructor(private staticFileService: StaticFileService) {}

    @UseGuards(AuthGuard)
    @Post("/upload")
    @UseInterceptors(FileInterceptor("file"))
    async uploadFile (@UploadedFile() file: Express.Multer.File, @Req() req: RequestWithUser) {
        console.log(file);
        return await this.staticFileService.saveFile({ 
            fileName: file.filename,
            fileType: file.mimetype,
            userId: req.user._id,
        })
    }

    @Get("/")
    async getAllFiles () {
        return await this.staticFileService.getAllFiles();
    }
}