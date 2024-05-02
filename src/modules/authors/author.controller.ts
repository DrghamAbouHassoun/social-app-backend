import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthorService } from "./author.service";
import { AuthorInput } from "src/interfaces/author.interface";

@Controller("/authors")
export class AuthorController {
    constructor (private authorService: AuthorService) {}

    @Get("/")
    async getAuthors() {
        return await this.authorService.getAuthors();
    }

    @Post("/")
    async addAuthors(@Body() author: AuthorInput) {
        return await this.authorService.addAuthor(author);
    }
}