// lib/getBusiness.ts
import config from "@/feast.config";
import { Business } from "@/types/business";
import { supabase } from "./supabase";

export async function getBusiness(): Promise<Business> {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", config.business.supabaseId)
    .single();

  if (error) throw error;
  return data as Business;
}
