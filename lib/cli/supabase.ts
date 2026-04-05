import ora from "ora";
import { Answers, SupabaseBusinessSchema } from "../../schema";
import { supabase } from "../supabase";

export async function seedBusiness(answers: Answers, orgId: string) {
  const supabaseSpinner = ora(
    `Seeding Supabase with ${answers.name + "'" + answers.name[answers.name.length - 1] === "s" ? "" : "s"} information...`,
  ).start();

  const created_at = new Date();
  const newBusiness = SupabaseBusinessSchema.parse({
    id: orgId,
    ...answers,
    created_at,
    updated_at: created_at,
  });

  const { data, error } = await supabase()
    .from("businesses")
    .insert([newBusiness])
    .select()
    .single();

  if (error || !data) {
    supabaseSpinner.fail("❌ Supabase seed failed");
    throw error;
  }

  supabaseSpinner.succeed(`✅ "${data.name}" successfully seeded in Supabase`);
}
