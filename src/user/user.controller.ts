import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
} from "@nestjs/common"
import { UserService } from "./user.service"
import { UpdateUserDto } from "./dto/update-user.dto"
import { AuthGuard } from "src/auth/auth.guard"
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger"

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags("user")
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: "unauthorized",
})
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: "find users" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "get all users",
  })
  findAll() {
    return this.userService.findAll()
  }

  @Get(":userId")
  @ApiOperation({ summary: "find user" })
  @ApiParam({
    name: "userId",
    type: "number",
    example: 1,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "get one user",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "user not found",
  })
  findOne(@Param("userId", ParseIntPipe) userId: number) {
    return this.userService.findOne(userId)
  }

  @Patch(":userId")
  @ApiOperation({ summary: "update user" })
  @ApiParam({
    name: "userId",
    type: "number",
    example: 1,
    required: true,
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "user updated",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "user not found",
  })
  update(
    @Param("userId", ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userId, updateUserDto)
  }

  @Delete(":userId")
  @ApiOperation({ summary: "delete user" })
  @ApiParam({
    name: "userId",
    type: "number",
    example: 1,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "user deleted",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "user not found",
  })
  delete(@Param("userId", ParseIntPipe) userId: number) {
    return this.userService.delete(userId)
  }
}
