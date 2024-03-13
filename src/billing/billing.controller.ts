import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common"
import { BillingService } from "./billing.service"
import { CreateBillingDto } from "./dto/create-billing.dto"
import { AuthGuard } from "src/auth/auth.guard"

@UseGuards(AuthGuard)
@Controller("billing")
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post()
  create(@Body() createBillingDto: CreateBillingDto) {
    return this.billingService.create(createBillingDto)
  }

  @Get()
  findAll() {
    return this.billingService.findAll()
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.billingService.findOne(id)
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.billingService.delete(id)
  }
}
