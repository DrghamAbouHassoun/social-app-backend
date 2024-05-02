import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Comment } from "src/schemas/comment.schema";


@Injectable()
export class CommentService {
    constructor (
        @InjectModel(Comment.name) private commentModel: Model<Comment>
    ) {}

    async addCommentToPost (comment: { content: string; userId: string; postId: string }) {
        try {
            const newComment = await this.commentModel.create(comment);
            return newComment;
        } catch (error) {
            console.log(error);
            return new HttpException({
                success: false,
                status: 500,
                messages: ["Something went wrong"],
                data: [],
                error,
            }, 200)
        }
    }

    async getCommentsByPostId (postId: string) {
        try {
            const comments = await this.commentModel.find({ postId: postId });
            return comments;
        } catch (error) {
            console.log(error);
            return new HttpException({
                success: false,
                status: 500,
                messages: ["Something went wrong"],
                data: [],
                error,
            }, 200)
        }
    }
}