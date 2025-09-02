export class ClientEnterprise {
  constructor(
    private _id: string,
    private _enterprise: string,
    private _fieldExpertise: string,
    private _colaboratorName: string,
    private _colaboratorSurname: string,
    private _position: string,
    private _administrationPerception: string,
    private _personalFamilyRelationsComment: string,
    private _organizationalStructureDefined: boolean,
    private _knowsMissionVisionCriticalFactors: boolean,
    private _educationLevel: EducationLevel,
    private _managementAdjustsStructure: boolean,
    private _hasPerformanceEvaluationPolicy: boolean,
    private _hasHRManagementIndicators: boolean,
    private _investsInTrainingPrograms: boolean,
    private _performance360Evaluation: Performance360Evaluation,
    private _remunerationPolicyCompetitive: boolean,
    private _performanceRewardExists: boolean,
    private _managementExperience: ManagementExperience,
    private _goalsMethodology?: string,
    private _hasClearCompetencies: boolean = false,
    private _improvementSuggestions: string = ''
  ) {}

  // Getters
  get id(): string {
    return this._id;
  }

  get enterprise(): string {
    return this._enterprise;
  }

  get fieldExpertise(): string {
    return this._fieldExpertise;
  }

  get colaboratorName(): string {
    return this._colaboratorName;
  }

  get colaboratorSurname(): string {
    return this._colaboratorSurname;
  }

  get position(): string {
    return this._position;
  }

  get administrationPerception(): string {
    return this._administrationPerception;
  }

  get personalFamilyRelationsComment(): string {
    return this._personalFamilyRelationsComment;
  }

  get organizationalStructureDefined(): boolean {
    return this._organizationalStructureDefined;
  }

  get knowsMissionVisionCriticalFactors(): boolean {
    return this._knowsMissionVisionCriticalFactors;
  }

  get educationLevel(): EducationLevel {
    return this._educationLevel;
  }

  get managementAdjustsStructure(): boolean {
    return this._managementAdjustsStructure;
  }

  get hasPerformanceEvaluationPolicy(): boolean {
    return this._hasPerformanceEvaluationPolicy;
  }

  get hasHRManagementIndicators(): boolean {
    return this._hasHRManagementIndicators;
  }

  get investsInTrainingPrograms(): boolean {
    return this._investsInTrainingPrograms;
  }

  get performance360Evaluation(): Performance360Evaluation {
    return this._performance360Evaluation;
  }

  get remunerationPolicyCompetitive(): boolean {
    return this._remunerationPolicyCompetitive;
  }

  get performanceRewardExists(): boolean {
    return this._performanceRewardExists;
  }

  get managementExperience(): ManagementExperience {
    return this._managementExperience;
  }

  get goalsMethodology(): string | undefined {
    return this._goalsMethodology;
  }

  get hasClearCompetencies(): boolean {
    return this._hasClearCompetencies;
  }

  get improvementSuggestions(): string {
    return this._improvementSuggestions;
  }

  // Setters
  set enterprise(value: string) {
    this._enterprise = value;
  }

  set fieldExpertise(value: string) {
    this._fieldExpertise = value;
  }

  set colaboratorName(value: string) {
    this._colaboratorName = value;
  }

  set colaboratorSurname(value: string) {
    this._colaboratorSurname = value;
  }

  set position(value: string) {
    this._position = value;
  }

  set administrationPerception(value: string) {
    this._administrationPerception = value;
  }

  set personalFamilyRelationsComment(value: string) {
    this._personalFamilyRelationsComment = value;
  }

  set organizationalStructureDefined(value: boolean) {
    this._organizationalStructureDefined = value;
  }

  set knowsMissionVisionCriticalFactors(value: boolean) {
    this._knowsMissionVisionCriticalFactors = value;
  }

  set educationLevel(value: EducationLevel) {
    this._educationLevel = value;
  }

  set managementAdjustsStructure(value: boolean) {
    this._managementAdjustsStructure = value;
  }

  set hasPerformanceEvaluationPolicy(value: boolean) {
    this._hasPerformanceEvaluationPolicy = value;
  }

  set hasHRManagementIndicators(value: boolean) {
    this._hasHRManagementIndicators = value;
  }

  set investsInTrainingPrograms(value: boolean) {
    this._investsInTrainingPrograms = value;
  }

  set performance360Evaluation(value: Performance360Evaluation) {
    this._performance360Evaluation = value;
  }

  set remunerationPolicyCompetitive(value: boolean) {
    this._remunerationPolicyCompetitive = value;
  }

  set performanceRewardExists(value: boolean) {
    this._performanceRewardExists = value;
  }

  set managementExperience(value: ManagementExperience) {
    this._managementExperience = value;
  }

  set goalsMethodology(value: string | undefined) {
    this._goalsMethodology = value;
  }

  set hasClearCompetencies(value: boolean) {
    this._hasClearCompetencies = value;
  }

  set improvementSuggestions(value: string) {
    this._improvementSuggestions = value;
  }
}

// Enums
export enum EducationLevel {
  ENSINO_FUNDAMENTAL = "ENSINO_FUNDAMENTAL",
  ENSINO_MEDIO = "ENSINO_MEDIO",
  ENSINO_SUPERIOR = "ENSINO_SUPERIOR",
}

export enum Performance360Evaluation {
  YES = "YES",
  NO = "NO",
  NOT_APPLICABLE = "NOT_APPLICABLE",
}

export enum ManagementExperience {
  ONE_TO_FIVE_YEARS = "ONE_TO_FIVE_YEARS",
  SIX_TO_TEN_YEARS = "SIX_TO_TEN_YEARS",
  MORE_THAN_TEN_YEARS = "MORE_THAN_TEN_YEARS",
}
