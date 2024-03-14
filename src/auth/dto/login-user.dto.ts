import { ApiProperty } from "@nestjs/swagger"

export class LoginUserDto {
  @ApiProperty({
    name: "email",
    type: "string",
    example: "bwayne@gmail.com",
    required: true,
  })
  email: string

  @ApiProperty({
    name: "password",
    type: "string",
    example: "123456",
    required: true,
  })
  password: string
}
