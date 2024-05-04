import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Comment } from "src/schemas/comment.schema";


@Injectable()
export class CommentService {
    constructor (
        @InjectModel(Comment.name) private commentModel: Model<Comment>
    ) {}

    /**
     * Adds a new comment to a post.
     *
     * @param comment - The comment object containing content, userId, and postId.
     * @returns The newly created comment document.
     * @throws Will throw an HttpException if there is an error creating the comment.
     */
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

    /**
     * Retrieves comments associated with a specific post.
     *
     * @param postId - The unique identifier of the post for which comments are to be retrieved.
     * @returns A promise that resolves to an array of Comment documents associated with the given postId.
     * @throws Will throw an HttpException if there is an error retrieving the comments.
     *
     * @example
     * ```typescript
     * const postId = "5f1771c1ba978a0017e24a23";
     * const comments = await commentService.getCommentsByPostId(postId);
     * console.log(comments);
     * ```
     */
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