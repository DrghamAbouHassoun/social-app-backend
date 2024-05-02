import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type StaticFileDocument = HydratedDocument<StaticFile>

@Schema({ timestamps: true })
export class StaticFile {
    @Prop({ required: true, type: String, unique: true })
    name: string;

    @Prop({ required: true, type: String })
    type: string;

    @Prop({ })
    alt: string;

    @Prop({ type: mongoose.Types.ObjectId, ref: "User" })
    uploadedBy: string;
}

export const StaticFileSchema = SchemaFactory.createForClass(StaticFile);