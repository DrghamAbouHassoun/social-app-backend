import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "src/schemas/category.schema";
import { CategoryController } from "./categories.controller";
import { CategoryService } from "./category.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}