import { IsOptional, IsString, IsEnum } from 'class-validator';

export enum DonationStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export class FilterDonorsDto {
  @IsOptional()
  @IsString()
  campaign_id?: string;

  @IsOptional()
  @IsEnum(DonationStatus)
  status?: DonationStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
