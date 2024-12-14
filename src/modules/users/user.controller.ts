import { Controller, Delete, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("/users")
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return {
      success: true,
      messages: ["Fetched Successfully"],
      data: users,
      status: 200,
    }
  }

  @Delete("/:id")
  async deleteUser(@Param("id") id: string) {
    const user = await this.userService.deleteUser(id);
    return {
      success: true,
      messages: ["Deleted Successfully"],
      data: user,
      status: 200,
    }
  }
}