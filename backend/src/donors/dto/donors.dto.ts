import { IsOptional, IsString, IsEnum, IsNumber, IsBoolean, IsUUID } from 'class-validator';

export enum DonationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
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

export class CreateDonationDto {
  @IsOptional()
  @IsUUID()
  campaign_id?: string;

  @IsOptional()
  @IsUUID()
  donor_auth_id?: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  payment_method?: string;

  @IsOptional()
  @IsString()
  transaction_ref?: string;

  @IsOptional()
  @IsUUID()
  hopecard_id?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsBoolean()
  anonymous?: boolean;

  @IsOptional()
  @IsEnum(DonationStatus)
  status?: DonationStatus;
}

export class UpdateDonationDto {
  @IsOptional()
  @IsUUID()
  campaign_id?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  payment_method?: string;

  @IsOptional()
  @IsString()
  transaction_ref?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsBoolean()
  anonymous?: boolean;

  @IsOptional()
  @IsEnum(DonationStatus)
  status?: DonationStatus;
}
