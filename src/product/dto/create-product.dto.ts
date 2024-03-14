import { ApiProperty } from "@nestjs/swagger"

export class CreateProductDto {
  @ApiProperty({
    name: "name",
    type: "string",
    example: "Water",
    required: true,
  })
  name: string

  @ApiProperty({
    name: "description",
    type: "string",
    example: "A simple description",
    required: true,
  })
  description: string

  @ApiProperty({
    name: "quantity",
    type: "number",
    example: 20,
    required: true,
  })
  quantity: number

  @ApiProperty({
    name: "userId",
    type: "number",
    example: 1,
    required: true,
  })
  userId: number
}
