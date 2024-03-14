import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
  @ApiProperty({
    name: "name",
    example: "Bruce",
    type: "string",
    required: true,
  })
  name: string

  @ApiProperty({
    name: "surname",
    example: "Wayne",
    type: "string",
    required: true,
  })
  surname: string

  @ApiProperty({
    name: "email",
    example: "bwayne@gmail.com",
    type: "string",
    required: true,
  })
  email: string

  @ApiProperty({
    name: "password",
    example: "123456",
    type: "string",
    required: true,
  })
  password: string
}
