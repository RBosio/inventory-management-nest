import { ApiProperty } from "@nestjs/swagger"

export class CreateBillingProductDto {
  @ApiProperty({
    name: "quantity",
    type: "number",
    example: 10,
    required: true,
  })
  quantity: number

  @ApiProperty({
    name: "billingId",
    type: "number",
    example: 1,
    required: true,
  })
  billingId: number

  @ApiProperty({
    name: "productId",
    type: "number",
    example: 1,
    required: true,
  })
  productId: number
}
