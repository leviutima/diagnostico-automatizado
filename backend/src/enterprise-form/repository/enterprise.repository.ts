import { CreateEnterpriseDto } from "../dto/create-enterprise.dto";

export const ENTERPRISE_REPOSITORY = 'CREATE_ENTERPRISE_REPOSITORY'

export abstract class EnterpriseRepository {
  abstract createEnterprise(data: CreateEnterpriseDto)
}