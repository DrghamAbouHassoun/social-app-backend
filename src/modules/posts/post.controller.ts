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

    @Get("/")
    async getAllPosts() {
        return await this.postService.findAll();
    }

    @Get("/:id")
    async getPostById(@Param("id") id: string) {
        return await this.postService.getPostById(id);
    }

    @Put("/:id")
    async updatePostById(@Param("id") id: string, @Body() body: CreatePostValidator) {
        return await this.postService.updatePostById(id, {
            content: body.content,
        });
    }

    @Delete("/:id")
    async deletePostById(@Param("id") id: string) {
        return await this.postService.deletePostById(id);
    }

    @UseGuards(AuthGuard)
    @Post("/:id/comments")
    async addCommentToPost(@Param("id") id: string, @Body() body: CreateCommentValidator, @Req() req: RequestWithUser) {
        return await this.commentService.addCommentToPost({
            content: body.content,
            postId: id,
            userId: req.user._id,
        });
    }

    @Get("/:id/comments")
    async getCommentsByPostId(@Param("id") id: string) {
        return await this.commentService.getCommentsByPostId(id);
    }

}