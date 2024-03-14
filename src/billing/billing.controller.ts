import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
} from "@nestjs/common"
import { BillingService } from "./billing.service"
import { CreateBillingDto } from "./dto/create-billing.dto"
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
@ApiTags("billing")
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: "unauthorized",
})
@Controller("billing")
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post()
  @ApiOperation({ summary: "create billing" })
  @ApiBody({ type: CreateBillingDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "billing created",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "user not found",
  })
  create(@Body() createBillingDto: CreateBillingDto) {
    return this.billingService.create(createBillingDto)
  }

  @Get()
  @ApiOperation({ summary: "find all billings" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "get all billings",
  })
  findAll() {
    return this.billingService.findAll()
  }

  @Get(":billingId")
  @ApiOperation({ summary: "find one billing" })
  @ApiParam({
    name: "billingId",
    type: "number",
    example: 1,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "get one billing",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "billing not found",
  })
  findOne(@Param("billingId", ParseIntPipe) billingId: number) {
    return this.billingService.findOne(billingId)
  }

  @Delete(":billingId")
  @ApiOperation({ summary: "delete billing" })
  @ApiParam({
    name: "billingId",
    type: "number",
    example: 1,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "billing deleted",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "billing not found",
  })
  delete(@Param("billingId", ParseIntPipe) billingId: number) {
    return this.billingService.delete(billingId)
  }
}
