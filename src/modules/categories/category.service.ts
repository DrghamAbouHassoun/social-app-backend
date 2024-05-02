import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCategoryInterface } from "src/interfaces/category.interface";
import { Category } from "src/schemas/category.schema";

@Injectable()
export class CategoryService {
    constructor (@InjectModel(Category.name) private categoryModel: Model<Category>) {};

    async findAll(): Promise<Category[]> {
        try {
            return await this.categoryModel.find().exec();
        } catch (error) {
            throw new HttpException({
                success: false,
                status: 500,
                description: "Something went wrong",
                data: null,
            }, 200, { cause: error });
        }
    }

    async create (category: CreateCategoryInterface): Promise<Category> {
        try {
            const createdCategory = await this.categoryModel.create({
                name: category.name,
            });
            return createdCategory;
        } catch (error) {
            throw new HttpException({
                status: 500,
                success: false,
                message: "Something went wrong",
                data: [],
            }, 200, { cause: error });
        }
        
    }

    async findOne (id: string): Promise<Category> {
        try {
            const category = await this.categoryModel.findById(id).exec();
            if (!category) {
                throw new HttpException({
                    status: 404,
                    message: "Category not found",
                }, 200);
            }
            return category;
        } catch (error) {
            throw new HttpException({
                success: false,
                status: 500,
                message: "Something went wrong",
                data: [],
            }, 200, { cause: error });
        }
    }

    async updateOne (id: string, createCategory: CreateCategoryInterface) {
        try {
            const category = await this.categoryModel.findByIdAndUpdate(id, {
                name: createCategory.name
            });
            if (!category) {
                return new HttpException({
                    status: 404,
                    success: false,
                    messages: ["Category not found"],
                    data: [],
                }, 200);
            }
            return category;
        } catch (error) {
            throw new HttpException({
                success: false,
                status: 500,
                message: "Something went wrong",
                data: [],
            }, 200, { cause: error });
        }
    }
}