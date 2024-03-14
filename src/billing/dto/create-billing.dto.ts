import { ApiProperty } from "@nestjs/swagger"

export class CreateBillingDto {
  @ApiProperty({
    name: "userId",
    type: "number",
    example: 1,
    required: true,
  })
  userId: number

  @ApiProperty({
    name: "customerId",
    type: "number",
    example: 2,
    required: true,
  })
  customerId: number
}
