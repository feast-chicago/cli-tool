// lib/getBusiness.ts
import config from "@/feast.config";
import { supabase } from "./supabase";
import { FeastConfig } from "../../schema";

export async function getBusiness(): Promise<FeastConfig> {
  const { data, error } = await supabase()
    .from("businesses")
    .select("*")
    .eq("id", config.id)
    .single();

  if (error) throw error;
  return data as FeastConfig;
}
