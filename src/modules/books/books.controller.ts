import { Body, Controller, Get, Post } from "@nestjs/common";
import BookType from "src/types/book";
import { BooksService } from "./books.service";

@Controller("books")
export class BooksController {
    constructor (private booksService: BooksService) {}

    @Get()
    async findAll(): Promise<BookType[]> {
        return this.booksService.findAll();
    }

    @Post()
    async create (@Body() createBookObject: BookType) {
        this.booksService.create(createBookObject);
    }
}