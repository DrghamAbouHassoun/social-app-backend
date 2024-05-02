import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthorDocument = HydratedDocument<Author>;

@Schema()
export class Author {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    bio: string;

    @Prop({})
    image: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);