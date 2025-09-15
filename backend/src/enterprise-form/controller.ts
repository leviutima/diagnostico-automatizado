import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateEnterpriseUsecase } from "./usecase/create-enterprise.usecase";
import { CreateEnterpriseDto } from "./dto/create-enterprise.dto";
import { GetFormByIdUseCase } from "./usecase/get-form-by-id.usecase";

@Controller('send-verification')
export class EnterpriseController {
  constructor(
    private readonly createEnterpriseUsecase: CreateEnterpriseUsecase,
    private readonly getFormById: GetFormByIdUseCase,
  ) {}

  @Post()
  async create(@Body() data: CreateEnterpriseDto) {
    return await this.createEnterpriseUsecase.execute(data)
  }
  
  @Get(":id")
  async getUnique(@Param('id') id: string) {
    return await this.getFormById.execute(id)
  }
}