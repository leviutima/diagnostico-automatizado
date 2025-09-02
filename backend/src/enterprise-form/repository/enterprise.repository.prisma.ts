import { Injectable } from '@nestjs/common';
import { CreateEnterpriseDto } from '../dto/create-enterprise.dto';
import { EnterpriseRepository } from './enterprise.repository';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EnterpriseRepositoryPrisma implements EnterpriseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createEnterprise(data: CreateEnterpriseDto) {
    return await this.prisma.clientEnterprise.create({
      data,
    });
  }
}
