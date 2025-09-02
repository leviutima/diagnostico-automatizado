import { Body, Controller, Post } from "@nestjs/common";
import { CreateEnterpriseUsecase } from "./usecase/create-enterprise.usecase";
import { CreateEnterpriseDto } from "./dto/create-enterprise.dto";

@Controller('send-verification')
export class EnterpriseController {
  constructor(
    private readonly createEnterpriseUsecase: CreateEnterpriseUsecase
  ) {}

  @Post()
  async create(@Body() data: CreateEnterpriseDto) {
    return await this.createEnterpriseUsecase.execute(data)
  }
  
}