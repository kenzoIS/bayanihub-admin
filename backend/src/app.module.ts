import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase';
import { ApplicationsModule } from './applications/applications.module';
import { DonorsModule } from './donors/donors.module';
import { VolunteersModule } from './volunteers/volunteers.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { DocumentsModule } from './documents/documents.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SupabaseModule,
    ApplicationsModule,
    DonorsModule,
    VolunteersModule,
    CampaignsModule,
    DocumentsModule,
    DashboardModule,
  ],
})
export class AppModule {}
