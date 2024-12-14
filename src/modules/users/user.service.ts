import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
import { CreateUser } from "src/types/user";
import * as bcrypt from 'bcrypt';
import { EmailService } from "../email/email.service";
import { ProducerService } from "../queues/producer.service";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private emailService: EmailService,
    private producerService: ProducerService,
  ) { }

  /**
   * Finds a user by their email.
   * Throws a 404 HttpException if the user is not found.
   *
   * @param email - The email of the user to find.
   * @returns The found user.
   * @throws HttpException - If the user is not found.
   */
  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new HttpException({
        success: false,
        messages: ["Email not found"],
        status: 404,
        data: [],
      }, 200)
    }
    return user;
  }

  /**
   * Finds a user by their ID.
   * Throws a 404 HttpException if the user is not found.
   *
   * @param id - The ID of the user to find.
   * @returns The found user.
   * @throws HttpException - If the user is not found.
   */
  async findUserById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException({
        success: false,
        messages: ["User not found"],
        status: 404,
        data: [],
      }, 200)
    }
    return user;
  }

  /**
   * Creates a new user in the database.
   *
   * @param user - The user object containing the name, email, and password.
   * @returns A promise that resolves to the newly created user.
   * @throws Error - If there is an error creating the user.
   *
   * @remarks
   * This function hashes the password before storing it in the database.
   *
   * @example
   * ```typescript
   * const newUser = await userService.create({
   *   name: 'John Doe',
   *   email: 'johndoe@example.com',
   *   password: 'password123'
   * });
   * console.log(newUser);
   * ```
   */
  async create(user: CreateUser) {
    const newUser = await this.userModel.create({
      name: user.name,
      email: user.email,
      password: await bcrypt.hash(user.password, 10)
    })
    await this.producerService.addToEmailQueue({
      email: newUser.email,
      subject: 'Welcome to our website!',
      html: `
                <h1>Welcome, ${newUser.name}!</h1>
                <p>Thank you for signing up for our website. Your account has been created.</p>
            `
    })
    return newUser;
  }

  async getAllUsers() {
    try {
      const user = await this.userModel.find();
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException({
        success: false,
        messages: ["Something went wrong"],
        status: 500,
        data: [],
      }, 200);
    }
  }

  async deleteUser (id: string) {
    try {
      const user = await this.userModel.findByIdAndDelete(id);
      if (!user) {
        throw new HttpException({
          success: false,
          messages: ["User not found"],
          status: 404,
          data: [],
        }, 200)
      }
    } catch (error) {
      console.log(error);
      throw new HttpException({
        success: false,
        messages: ["Something went wrong"],
        status: 500,
        data: [],
      }, 200);
    }
  }
}