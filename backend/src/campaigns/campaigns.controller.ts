import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { FilterCampaignsDto } from './dto/campaigns.dto';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  /**
   * GET /campaigns
   * Review Donation Inventory - list campaigns with Items, Sites, Date, Time.
   */
  @Get()
  findAll(@Query() filters: FilterCampaignsDto) {
    return this.campaignsService.findAll(filters);
  }

  /**
   * GET /campaigns/stats
   * Dashboard statistics for campaigns.
   */
  @Get('stats')
  getStats() {
    return this.campaignsService.getStats();
  }

  /**
   * GET /campaigns/:id
   * Get a single campaign with full details + donations.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(id);
  }
}
