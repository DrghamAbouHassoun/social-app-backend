import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Category } from "src/schemas/category.schema";
import { CreateCategoryValidator } from "src/validators/category.validator";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";

@Controller()
export class CategoryController {
    constructor (private readonly categoryService: CategoryService) {};

    @Get("/categories")
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Post("/categories")
    // @ApiResponse({ status: 200, messages: []})
    async create (@Body() category: CreateCategoryValidator) {
        return await this.categoryService.create(category);
    }

    @Get("/categories/:id")
    async findOne (@Param('id') id: string): Promise<Category> {
        return await this.categoryService.findOne(id);
    }

    @Put("/categories/:id")
    async updateOne (id: string, @Body() category: CreateCategoryValidator) {
        return await this.categoryService.updateOne(id, category);
    }
}