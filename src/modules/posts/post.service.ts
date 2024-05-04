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

    /**
     * Retrieves all posts from the database.
     *
     * @returns {Promise<SocialPost[]>} A promise that resolves to an array of {@link SocialPost} objects.
     * @throws {HttpException} If an error occurs during the database operation.
     */
    async findAll(): Promise<SocialPost[]> {
        return await this.postModel.find();
    }

    /**
     * Creates a new post in the database.
     *
     * @param post - An object containing the content, userId, file, and fileType of the post.
     * @param post.content - The content of the post.
     * @param post.userId - The ID of the user creating the post.
     * @param post.file - The file associated with the post.
     * @param post.fileType - The type of the file associated with the post.
     *
     * @returns {Promise<SocialPost>} A promise that resolves to the newly created {@link SocialPost} object.
     *
     * @throws {HttpException} If an error occurs during the database operation.
     * The error message will be "Something went wrong" and the HTTP status code will be 500.
     */
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

    /**
     * Retrieves a post by its ID from the database.
     *
     * @param postId - The ID of the post to retrieve.
     *
     * @returns {Promise<SocialPost>} A promise that resolves to the {@link SocialPost} object with the given ID.
     * If the post is not found, the promise will resolve to `undefined`.
     *
     * @throws {HttpException} If an error occurs during the database operation.
     * The error message will be "Post not found" and the HTTP status code will be 404.
     * If an unexpected error occurs, the error message will be "Something went wrong" and the HTTP status code will be 500.
     */
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

    /**
     * Updates a post in the database by its ID.
     *
     * @param postId - The ID of the post to update.
     * @param body - An object containing the updated content of the post.
     * @param body.content - The updated content of the post.
     *
     * @returns {Promise<SocialPost>} A promise that resolves to the updated {@link SocialPost} object.
     * If the post is not found, the promise will resolve to `undefined`.
     *
     * @throws {HttpException} If an error occurs during the database operation.
     * The error message will be "Post not found" and the HTTP status code will be 404.
     * If an unexpected error occurs, the error message will be "Something went wrong" and the HTTP status code will be 500.
     */
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

    /**
     * Deletes a post in the database by its ID.
     *
     * @param postId - The ID of the post to delete.
     *
     * @returns {Promise<SocialPost>} A promise that resolves to the deleted {@link SocialPost} object.
     * If the post is not found, the promise will resolve to `undefined`.
     *
     * @throws {HttpException} If an error occurs during the database operation.
     * The error message will be "Post not found" and the HTTP status code will be 404.
     * If an unexpected error occurs, the error message will be "Something went wrong" and the HTTP status code will be 500.
     */
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