import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { Request } from "express";
import { AuthGuard } from "src/guards/auth.guard";
import { RequestWithUser } from "src/types/auth";
import { PostService } from "./post.service";
import { CreateCommentValidator, CreatePostValidator } from "src/validators/post.validator";
import { CommentService } from "../comments/comment.service";


@Controller("/posts")
export class PostController {
    constructor(
        private postService: PostService,
        private commentService: CommentService,
    ) {};

    /**
     * Adds a new post to the database.
     *
     * @param req - The request object containing user information.
     * @param body - The body of the request containing the post content, file, and file type.
     * @returns The newly created post.
     *
     * @throws Will throw an error if the user is not authenticated.
     */
    @UseGuards(AuthGuard)
    @Post("/")
    addPost(@Req() req: RequestWithUser, @Body() body: CreatePostValidator) {
        console.log("Request: ", req.user);
        return this.postService.create({
            content: body.content,
            userId: req.user._id,
            file: body.file || "",
            fileType: body.filetype || "",
        })
    }

    /**
     * Retrieves all posts from the database.
     *
     * @returns A promise that resolves to an array of all posts.
     *
     * @throws Will throw an error if there is a problem with the database connection or query execution.
     */
    @Get("/")
    async getAllPosts() {
        return await this.postService.findAll();
    }

    /**
     * Retrieves a post by its ID from the database.
     *
     * @param id - The ID of the post to retrieve.
     * @returns A promise that resolves to the post with the given ID.
     *
     * @throws Will throw an error if the post with the given ID does not exist or if there is a problem with the database connection or query execution.
     */
    @Get("/:id")
    async getPostById(@Param("id") id: string) {
        return await this.postService.getPostById(id);
    }

    /**
     * Updates a post by its ID in the database.
     *
     * @param id - The ID of the post to update.
     * @param body - The updated content of the post.
     * @returns A promise that resolves to the updated post.
     *
     * @throws Will throw an error if the post with the given ID does not exist or if there is a problem with the database connection or query execution.
     *
     * @example
     * ```typescript
     * const updatedPost = await updatePostById("postId123", { content: "New updated content" });
     * console.log(updatedPost); // Output: { _id: "postId123", content: "New updated content",... }
     * ```
     */
    @Put("/:id")
    async updatePostById(@Param("id") id: string, @Body() body: CreatePostValidator) {
        return await this.postService.updatePostById(id, {
            content: body.content,
        });
    }

    /**
     * Deletes a post by its ID in the database.
     *
     * @param id - The ID of the post to delete.
     * @returns A promise that resolves to the deleted post.
     *
     * @throws Will throw an error if the post with the given ID does not exist or if there is a problem with the database connection or query execution.
     *
     * @example
     * ```typescript
     * const deletedPost = await deletePostById("postId123");
     * console.log(deletedPost); // Output: { _id: "postId123", content: "Old content",... }
     * ```
     */
    @Delete("/:id")
    async deletePostById(@Param("id") id: string) {
        return await this.postService.deletePostById(id);
    }

    /**
     * Adds a new comment to a post in the database.
     *
     * @param id - The ID of the post to which the comment will be added.
     * @param body - The body of the request containing the comment content.
     * @param req - The request object containing user information.
     * @returns A promise that resolves to the newly created comment.
     *
     * @throws Will throw an error if the user is not authenticated.
     * @throws Will throw an error if there is a problem with the database connection or query execution.
     *
     * @example
     * ```typescript
     * const newComment = await addCommentToPost("postId123", { content: "Great post!" }, req);
     * console.log(newComment); // Output: { _id: "commentId123", content: "Great post!", postId: "postId123", userId: "userId123",... }
     * ```
     */
    @UseGuards(AuthGuard)
    @Post("/:id/comments")
    async addCommentToPost(@Param("id") id: string, @Body() body: CreateCommentValidator, @Req() req: RequestWithUser) {
        return await this.commentService.addCommentToPost({
            content: body.content,
            postId: id,
            userId: req.user._id,
        });
    }

    /**
     * Retrieves all comments associated with a specific post from the database.
     *
     * @param id - The ID of the post for which to retrieve comments.
     * @returns A promise that resolves to an array of comments associated with the given post ID.
     *
     * @throws Will throw an error if there is a problem with the database connection or query execution.
     *
     * @example
     * ```typescript
     * const comments = await getCommentsByPostId("postId123");
     * console.log(comments); // Output: [{ _id: "commentId123", content: "Great post!", postId: "postId123", userId: "userId123",... }, {...}]
     * ```
     */
    @Get("/:id/comments")
    async getCommentsByPostId(@Param("id") id: string) {
        return await this.commentService.getCommentsByPostId(id);
    }

}