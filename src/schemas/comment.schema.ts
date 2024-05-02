import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
    @Prop()
    content: string;

    @Prop({ type: mongoose.Types.ObjectId, ref: "User" })
    userId: string;

    @Prop({ type: mongoose.Types.ObjectId, ref: "Post" })
    postId: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);