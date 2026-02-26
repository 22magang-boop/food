import { supabase } from './supabaseClient';

export type BusinessProfileRow = {
  id: string;
  name: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  city: string;
  province: string;
  description: string;
  updated_at: string;
};

export type PricingPlanRow = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string | null;
  features: unknown | null;
  popular: boolean;
  updated_at: string;
};

export type CartRow = {
  id: string;
  icon_name: string;
  name: string;
  description: string;
  features: unknown | null;
  updated_at: string;
};

export type TestimonialRow = {
  id: string;
  name: string;
  business: string;
  avatar: string | null;
  rating: number;
  text: string;
  sort_order: number;
  created_at: string;
};

export async function getBusinessProfile() {
  const { data, error } = await supabase
    .from('business_profile')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data as BusinessProfileRow | null;
}

export async function getPricingPlans() {
  const { data, error } = await supabase
    .from('pricing_plans')
    .select('*')
    .order('popular', { ascending: false })
    .order('id', { ascending: true });

  if (error) throw error;
  return (data || []) as PricingPlanRow[];
}

export async function getCarts() {
  const { data, error } = await supabase
    .from('carts')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;
  return (data || []) as CartRow[];
}

export async function getTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []) as TestimonialRow[];
}

export async function upsertBusinessProfile(input: Omit<BusinessProfileRow, 'id' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('business_profile')
    .upsert({ ...input, updated_at: new Date().toISOString() })
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data as BusinessProfileRow | null;
}

export async function upsertPricingPlans(plans: Array<Omit<PricingPlanRow, 'updated_at'>>) {
  const payload = plans.map((p) => ({ ...p, updated_at: new Date().toISOString() }));
  const { data, error } = await supabase.from('pricing_plans').upsert(payload).select('*');
  if (error) throw error;
  return (data || []) as PricingPlanRow[];
}

export async function upsertCarts(carts: Array<Omit<CartRow, 'updated_at'>>) {
  const payload = carts.map((c) => ({ ...c, updated_at: new Date().toISOString() }));
  const { data, error } = await supabase.from('carts').upsert(payload).select('*');
  if (error) throw error;
  return (data || []) as CartRow[];
}

export async function deleteCartById(id: string) {
  const { error } = await supabase.from('carts').delete().eq('id', id);
  if (error) throw error;
}

export async function upsertTestimonials(items: Array<Omit<TestimonialRow, 'id' | 'created_at'>>) {
  const { data, error } = await supabase.from('testimonials').upsert(items).select('*');
  if (error) throw error;
  return (data || []) as TestimonialRow[];
}
