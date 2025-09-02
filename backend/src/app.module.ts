import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnterpriseController } from './enterprise-form/controller';
import { PrismaService } from './prisma.service';
import { EnterpriseModule } from './enterprise-form/enterprise.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EnterpriseModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
