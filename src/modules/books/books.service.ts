import { Injectable } from "@nestjs/common";
import BookType from "src/types/book";

@Injectable()
export class BooksService {
    private readonly books: BookType[] = [
        {
            id: "132523",
            title: "Book One",
            description: "Book One Description",
            author: "Book One Author",
        },
        {
            id: "352345",
            title: "Book Two",
            description: "Book Two Description",
            author: "Book Two Author",
        },
    ];

    create (book: BookType): void {
        this.books.push(book);
    }

    async findAll (): Promise<BookType[]> {
        return this.books;
    }
}