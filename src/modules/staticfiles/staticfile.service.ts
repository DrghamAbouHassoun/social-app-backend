import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { StaticFile } from "src/schemas/staticfile.schema";

@Injectable()
export class StaticFileService {
    constructor (@InjectModel(StaticFile.name) private staticFileModel: Model<StaticFile>) {};

    async getAllFiles () {
        return await this.staticFileModel.find();
    }

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