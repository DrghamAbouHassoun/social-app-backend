import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel, MongooseModule } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Post, Post as SocialPost } from "src/schemas/post.schema";
import { UserService } from "../users/user.service";

@Injectable()
export class PostService {
    constructor (
        @InjectModel(SocialPost.name) private postModel: Model<SocialPost>,
        private userService: UserService,
    ) {}

    async findAll(): Promise<SocialPost[]> {
        return await this.postModel.find();
    }

    async create(post : { content: string; userId: string; file: string, fileType: string; }): Promise<SocialPost> {
        try {
            const user = await this.userService.findUserById(post.userId)
            
            const newPost = await this.postModel.create({
                content: post.content,
                userId: user._id,
                file: post.file || "",
                fileType: post.fileType  || "image",
            })
            return newPost;
        } catch (error) {
            console.log(error);
            throw new HttpException({
                success: false,
                messages: ["Something went wrong"],
                data: [],
                status: 500,
            }, 200);
        }
    }

    async getPostById (postId: string) {
        try {
            const post = await this.postModel.findById(postId);
            if (!post) {
                return new HttpException({
                    success: false,
                    messages: ["Post not found"],
                    data: [],
                    status: 404,
                }, 200)
            }
            return post;
        } catch (error) {
            console.log(error);
            throw new HttpException({
                success: false,
                messages: ["Something went wrong"],
                data: [],
                status: 500,
            }, 200);
        }
    }

    async updatePostById (postId: string, body: { content: string }) {
        try {
            const post = await this.postModel.findByIdAndUpdate(postId, body);
            if (!post) {
                return new HttpException({
                    success: false,
                    messages: ["Post not found"],
                    data: [],
                    status: 404,
                }, 200)
            }
            return post;
        } catch (error) {
            console.log(error);
            throw new HttpException({
                success: false,
                messages: ["Something went wrong"],
                data: [],
                status: 500,
            }, 200);
        }
    }

    async deletePostById (postId: string) {
        try {
            const post = await this.postModel.findByIdAndDelete(postId);
            if (!post) {
                return new HttpException({
                    success: false,
                    messages: ["Post not found"],
                    data: [],
                    status: 404,
                }, 200)
            }
            return post;
        } catch (error) {
            console.log(error);
            throw new HttpException({
                success: false,
                messages: ["Something went wrong"],
                data: [],
                status: 500,
            }, 200);
        }
    }
}