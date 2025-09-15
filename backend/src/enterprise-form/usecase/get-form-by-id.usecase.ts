import { Inject, Injectable } from "@nestjs/common";
import { ENTERPRISE_REPOSITORY, EnterpriseRepository } from "../repository/enterprise.repository";

@Injectable()
export class GetFormByIdUseCase {
  constructor(
    @Inject(ENTERPRISE_REPOSITORY)
    private readonly enterpriseRepo: EnterpriseRepository
  ) {}

  async execute(id: string) {
    return await this.enterpriseRepo.getFormById(id)
  }
}