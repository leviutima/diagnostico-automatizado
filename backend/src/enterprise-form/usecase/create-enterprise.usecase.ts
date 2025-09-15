import { Inject, Injectable } from '@nestjs/common';
import {
  ENTERPRISE_REPOSITORY,
  EnterpriseRepository,
} from '../repository/enterprise.repository';
import { CreateEnterpriseDto } from '../dto/create-enterprise.dto';
import { MailService } from 'src/mail/mail.service';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateEnterpriseUsecase {
  constructor(
    @Inject(ENTERPRISE_REPOSITORY)
    private readonly enterpriseRepo: EnterpriseRepository,
    private readonly mail: MailService,
  ) {}

  async execute(data: CreateEnterpriseDto) {
    const createdEnterprise = await this.enterpriseRepo.createEnterprise(data);
    const {
      id,
      enterprise,
      colaboratorName,
      colaboratorSurname,
      colaboratorEmail,
    } = createdEnterprise;

    if (createdEnterprise) {
      const accesToken = randomUUID();

      const frontEndUrl = `http://localhost:5173/diagnostico/${id}?token=${accesToken}`;

      await this.mail.sendToDiagnostic(
        enterprise,
        colaboratorName,
        colaboratorSurname,
        colaboratorEmail,
        frontEndUrl,
      );
       return { ...createdEnterprise, diagnosticLink: frontEndUrl };
    } else {
      console.log('erro ao criar sugestao');
      throw new Error('Falha ao criar diagnóstico');
    }
  }
}
