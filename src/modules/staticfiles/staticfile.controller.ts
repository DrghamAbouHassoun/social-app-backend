import { Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { StaticFileService } from "./staticfile.service";
import { AuthGuard } from "src/guards/auth.guard";
import { RequestWithUser } from "src/types/auth";

@Controller("/files")
export class StaticFileController {
    constructor(private staticFileService: StaticFileService) {}

    /**
     * Handles file upload requests.
     *
     * @param file - The uploaded file.
     * @param req - The request object containing user information.
     *
     * @returns A promise that resolves to the saved file information.
     *
     * @throws Will throw an error if the file upload fails.
     */
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

    /**
     * Retrieves all files from the database.
     *
     * @returns A promise that resolves to an array of file information objects.
     *
     * @throws Will throw an error if the retrieval fails.
     */
    @Get("/")
    async getAllFiles () {
        return await this.staticFileService.getAllFiles();
    }
}