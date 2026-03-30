import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase';
import { FilterDonorsDto, CreateDonationDto, UpdateDonationDto } from './dto/donors.dto';

@Injectable()
export class DonorsService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async findAll(filters: FilterDonorsDto) {
    let query = this.supabase
      .from('donations')
      .select('*')
      .order('donated_at', { ascending: false });

    if (filters.campaign_id) {
      query = query.eq('campaign_id', filters.campaign_id);
    }
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.search) {
      query = query.or(
        `message.ilike.%${filters.search}%,transaction_ref.ilike.%${filters.search}%`,
      );
    }

    const { data: donations, error } = await query;
    if (error) throw error;
    if (!donations?.length) return [];

    const donorIds = [...new Set(donations.map((d) => d.donor_auth_id).filter(Boolean))];
    const campaignIds = [...new Set(donations.map((d) => d.campaign_id).filter(Boolean))];

    const [profilesRes, campaignsRes] = await Promise.all([
      donorIds.length
        ? this.supabase.from('user_profiles').select('auth_user_id, first_name, last_name, phone, address, barangay, municipality, province, profile_photo_key').in('auth_user_id', donorIds)
        : { data: [] },
      campaignIds.length
        ? this.supabase.from('bh_campaigns').select('id, title, type, status').in('id', campaignIds)
        : { data: [] },
    ]);

    const profileMap = new Map((profilesRes.data ?? []).map((p: any) => [p.auth_user_id, p]));
    const campaignMap = new Map((campaignsRes.data ?? []).map((c: any) => [c.id, c]));

    return donations.map((d) => ({
      ...d,
      user_profiles: profileMap.get(d.donor_auth_id) ?? null,
      bh_campaigns: campaignMap.get(d.campaign_id) ?? null,
    }));
  }

  async findOne(id: string) {
    const { data: donation, error } = await this.supabase
      .from('donations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    const [profileRes, campaignRes] = await Promise.all([
      donation.donor_auth_id
        ? this.supabase.from('user_profiles').select('auth_user_id, first_name, last_name, phone, address, barangay, municipality, province, profile_photo_key').eq('auth_user_id', donation.donor_auth_id).single()
        : { data: null },
      donation.campaign_id
        ? this.supabase.from('bh_campaigns').select('id, title, description, type, target_amount, current_amount, start_date, end_date, status').eq('id', donation.campaign_id).single()
        : { data: null },
    ]);

    return {
      ...donation,
      user_profiles: profileRes.data ?? null,
      bh_campaigns: campaignRes.data ?? null,
    };
  }

  /**
   * Get donation summary statistics for the dashboard.
   */
  async getStats() {
    const { count: totalDonors, error: countErr } = await this.supabase
      .from('donations')
      .select('*', { count: 'exact', head: true });

    const { data: sumData, error: sumErr } = await this.supabase
      .from('donations')
      .select('amount')
      .eq('status', 'completed');

    if (countErr) throw countErr;
    if (sumErr) throw sumErr;

    const totalAmount = (sumData ?? []).reduce(
      (sum, d) => sum + Number(d.amount ?? 0),
      0,
    );

    return {
      total_donors: totalDonors ?? 0,
      total_amount: totalAmount,
    };
  }

  async create(dto: CreateDonationDto) {
    const { data, error } = await this.supabase
      .from('donations')
      .insert({
        campaign_id: dto.campaign_id ?? null,
        donor_auth_id: dto.donor_auth_id ?? null,
        amount: dto.amount,
        currency: dto.currency ?? 'PHP',
        payment_method: dto.payment_method ?? null,
        transaction_ref: dto.transaction_ref ?? null,
        hopecard_id: dto.hopecard_id ?? null,
        message: dto.message ?? null,
        anonymous: dto.anonymous ?? false,
        status: dto.status ?? 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: string, dto: UpdateDonationDto) {
    const updateData: Record<string, any> = {};
    if (dto.campaign_id !== undefined) updateData.campaign_id = dto.campaign_id;
    if (dto.amount !== undefined) updateData.amount = dto.amount;
    if (dto.currency !== undefined) updateData.currency = dto.currency;
    if (dto.payment_method !== undefined) updateData.payment_method = dto.payment_method;
    if (dto.transaction_ref !== undefined) updateData.transaction_ref = dto.transaction_ref;
    if (dto.message !== undefined) updateData.message = dto.message;
    if (dto.anonymous !== undefined) updateData.anonymous = dto.anonymous;
    if (dto.status !== undefined) updateData.status = dto.status;

    const { data, error } = await this.supabase
      .from('donations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new NotFoundException('Donation not found');
    return data;
  }

  async remove(id: string) {
    const { error } = await this.supabase
      .from('donations')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { deleted: true };
  }
}
