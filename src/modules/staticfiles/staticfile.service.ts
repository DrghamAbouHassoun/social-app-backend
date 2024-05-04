import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { StaticFile } from "src/schemas/staticfile.schema";

@Injectable()
export class StaticFileService {
    constructor (@InjectModel(StaticFile.name) private staticFileModel: Model<StaticFile>) {};

    /**
     * Retrieves all static files from the database.
     *
     * @returns A Promise that resolves to an array of StaticFile documents.
     *          If an error occurs during the retrieval process, the Promise will be rejected with an HttpException.
     *
     * @throws HttpException - If an error occurs during the retrieval process.
     *
     * @example
     * ```typescript
     * const allFiles = await staticFileService.getAllFiles();
     * console.log(allFiles);
     * ```
     */
    async getAllFiles () {
        return await this.staticFileModel.find();
    }

    /**
     * Saves a new static file to the database.
     *
     * @param fileName - The name of the file.
     * @param fileType - The type of the file.
     * @param userId - The unique identifier of the user who uploaded the file.
     *
     * @returns A Promise that resolves to the saved StaticFile document.
     *          If an error occurs during the save process, the Promise will be rejected with an HttpException.
     *
     * @throws HttpException - If an error occurs during the save process.
     *
     * @example
     * ```typescript
     * const fileName = "example.jpg";
     * const fileType = "image/jpeg";
     * const userId = "1234567890";
     * const savedFile = await staticFileService.saveFile(fileName, fileType, userId);
     * console.log(savedFile);
     * ```
     */
    async saveFile ({ fileName, fileType, userId }: { fileName: string; fileType: string; userId: string }) {
        try {
            const file = await this.staticFileModel.create({
                name: fileName,
                type: fileType,
                uploadedBy: userId,
                alt: "",
            })
            return file;
        } catch (error) {
            console.log(error);
            return new HttpException({
                success: false,
                stauts: 500,
                messages: ["Something went wrong"],
                data: [],
                error,
            }, 200);
        }
    }

    /**
     * Retrieves a list of static files uploaded by a specific user.
     *
     * @param userId - The unique identifier of the user whose files should be retrieved.
     * @returns A Promise that resolves to an array of StaticFile documents.
     *          If an error occurs during the retrieval process, the Promise will be rejected with an HttpException.
     *
     * @throws HttpException - If an error occurs during the retrieval process.
     *
     * @example
     * ```typescript
     * const userId = "1234567890";
     * const files = await staticFileService.getFilesByUserId(userId);
     * console.log(files);
     * ```
     */
    async getFilesByUserId (userId: string) {
        try {
            return await this.staticFileModel.find({ uploadedBy: userId });
        } catch (error) {
            console.log(error);
            return new HttpException({
                success: false,
                stauts: 500,
                messages: ["Something went wrong"],
                data: [],
                error,
            }, 200);
        }
    }

   
}