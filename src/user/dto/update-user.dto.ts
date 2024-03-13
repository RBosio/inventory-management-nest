import { ApiProperty } from "@nestjs/swagger"

export class UpdateUserDto {
  @ApiProperty({
    name: "name",
    example: "John",
    type: "string",
    required: false,
  })
  name?: string
  @ApiProperty({
    name: "surname",
    example: "Doe",
    type: "string",
    required: false,
  })
  surname?: string
  @ApiProperty({
    name: "password",
    example: "123456",
    type: "string",
    required: false,
  })
  password?: string
}
