import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { DonorsService } from './donors.service';
import { FilterDonorsDto } from './dto/donors.dto';

@Controller('donors')
export class DonorsController {
  constructor(private readonly donorsService: DonorsService) {}

  /**
   * GET /donors
   * View Donor Applicant List with optional filters.
   */
  @Get()
  findAll(@Query() filters: FilterDonorsDto) {
    return this.donorsService.findAll(filters);
  }

  /**
   * GET /donors/stats
   * Dashboard statistics for donations.
   */
  @Get('stats')
  getStats() {
    return this.donorsService.getStats();
  }

  /**
   * GET /donors/:id
   * Get a single donation record.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donorsService.findOne(id);
  }
}
