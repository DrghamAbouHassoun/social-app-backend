import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Author } from './author.schema';
import { Category } from './category.schema';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
    @Prop({ required: true })
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category" })
    category: Category;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Author" })
    author: Author

    @Prop({ required: true })
    description: string;

    @Prop({})
    image: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);