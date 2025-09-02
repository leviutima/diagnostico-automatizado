import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsEnum, IsOptional, IsEmail } from 'class-validator';
import { EducationLevel, ManagementExperience, Performance360Evaluation } from '../domain/enterprise.entity';

export class CreateEnterpriseDto {
  @ApiProperty({ description: 'Nome da empresa' })
  @IsString()
  enterprise: string;

  @ApiProperty({ description: 'Área de atuação do colaborador' })
  @IsString()
  fieldExpertise: string;

  @ApiProperty({ description: 'Nome do colaborador' })
  @IsString()
  colaboratorName: string;

  @ApiProperty({ description: 'Sobrenome do colaborador' })
  @IsString()
  colaboratorSurname: string;

  @ApiProperty({description: "email do colaborador"})
  @IsEmail()
  colaboratorEmail: string

  @ApiProperty({ description: 'Cargo do colaborador' })
  @IsString()
  position: string;

  @ApiProperty({ description: 'Percepção da administração' })
  @IsString()
  administrationPerception: string;

  @ApiProperty({ description: 'Comentário sobre relações pessoais e familiares' })
  @IsString()
  personalFamilyRelationsComment: string;

  @ApiProperty({ description: 'Estrutura organizacional definida?' })
  @IsBoolean()
  organizationalStructureDefined: boolean;

  @ApiProperty({ description: 'Conhece missão, visão e fatores críticos?' })
  @IsBoolean()
  knowsMissionVisionCriticalFactors: boolean;

  @ApiProperty({ enum: EducationLevel })
  @IsEnum(EducationLevel)
  educationLevel: EducationLevel;

  @ApiProperty({ description: 'A gestão ajusta a estrutura conforme necessário?' })
  @IsBoolean()
  managementAdjustsStructure: boolean;

  @ApiProperty({ description: 'Existe política de avaliação de desempenho?' })
  @IsBoolean()
  hasPerformanceEvaluationPolicy: boolean;

  @ApiProperty({ description: 'Possui indicadores de gestão de RH?' })
  @IsBoolean()
  hasHRManagementIndicators: boolean;

  @ApiProperty({ description: 'Investe em programas de treinamento?' })
  @IsBoolean()
  investsInTrainingPrograms: boolean;

  @ApiProperty({ enum: Performance360Evaluation })
  @IsEnum(Performance360Evaluation)
  performance360Evaluation: Performance360Evaluation;

  @ApiProperty({ description: 'Política de remuneração competitiva?' })
  @IsBoolean()
  remunerationPolicyCompetitive: boolean;

  @ApiProperty({ description: 'Existe premiação por desempenho?' })
  @IsBoolean()
  performanceRewardExists: boolean;

  @ApiProperty({ enum: ManagementExperience })
  @IsEnum(ManagementExperience)
  managementExperience: ManagementExperience;

  @ApiProperty({ description: 'Metodologia de definição de metas', required: false })
  @IsOptional()
  @IsString()
  goalsMethodology?: string;

  @ApiProperty({ description: 'Existem competências claras?' })
  @IsBoolean()
  hasClearCompetencies: boolean;

  @ApiProperty({ description: 'Sugestões de melhoria' })
  @IsString()
  improvementSuggestions: string;
}
