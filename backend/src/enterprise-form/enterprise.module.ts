import { Module } from '@nestjs/common';
import { EnterpriseController } from './controller';
import { PrismaService } from 'src/prisma.service';
import { CreateEnterpriseUsecase } from './usecase/create-enterprise.usecase';
import { ENTERPRISE_REPOSITORY } from './repository/enterprise.repository';
import { EnterpriseRepositoryPrisma } from './repository/enterprise.repository.prisma';
import { MailService } from 'src/mail/mail.service';
import { GetFormByIdUseCase } from './usecase/get-form-by-id.usecase';

@Module({
  imports: [],
  controllers: [EnterpriseController],
  providers: [
    PrismaService,
    MailService,
    CreateEnterpriseUsecase,
    GetFormByIdUseCase,
    { provide: ENTERPRISE_REPOSITORY, useClass: EnterpriseRepositoryPrisma },
  ],
})
export class EnterpriseModule {}
