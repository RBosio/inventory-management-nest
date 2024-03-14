import { ApiProperty } from "@nestjs/swagger"

export class UpdateProductDto {
  @ApiProperty({
    name: "name",
    type: "string",
    example: "Meal",
    required: false,
  })
  name?: string

  @ApiProperty({
    name: "description",
    type: "string",
    example: "Description updated",
    required: false,
  })
  description?: string

  @ApiProperty({
    name: "quantity",
    type: "number",
    example: 10,
    required: false,
  })
  quantity?: number
}
