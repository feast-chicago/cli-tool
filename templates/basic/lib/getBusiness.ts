// lib/getBusiness.ts
import config from "@/feast.config";
import { supabase } from "./supabase";
import { FeastConfig } from "@/types/feast";

export async function getBusiness(): Promise<FeastConfig> {
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", config.business.supabaseId)
    .single();

  if (error) throw error;
  return data as FeastConfig;
}
