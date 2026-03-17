import { IsOptional, IsString, IsEnum } from 'class-validator';

export enum CampaignStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  DRAFT = 'draft',
}

export class FilterCampaignsDto {
  @IsOptional()
  @IsEnum(CampaignStatus)
  status?: CampaignStatus;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  org_id?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
