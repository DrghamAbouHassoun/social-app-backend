import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
    @Prop({ required: true })
    content: string;

    @Prop({ })
    file: string;

    @Prop({ enum: ["image", "video", "audio"], default: "image" })
    fileType: string;

    @Prop({ required: true, ref: "User" })
    userId: mongoose.Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);