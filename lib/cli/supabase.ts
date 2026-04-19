import ora from "ora";
import { Answers, Business } from "../../schema";
import { supabase } from "../supabase";

export async function createBusiness(answers: Answers, orgId: string) {
  const supabaseSpinner = ora(
    `Seeding Supabase with ${answers.name}'${answers.name[answers.name.length - 1] === "s" ? "" : "s"} information...`,
  ).start();

  const created_at = new Date();
  const newBusiness: Business = {
    id: orgId,
    ...answers,
    created_at,
    updated_at: created_at,
  };

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

export async function updateBusiness(answers: Answers, orgId: string) {
  const supabaseSpinner = ora(
    `Updating Supabase with ${answers.name}'${answers.name[answers.name.length - 1] === "s" ? "" : "s"} information...`,
  ).start();

  const updated_at = new Date();
  const { data, error } = await supabase()
    .from("businesses")
    .update({ ...answers, updated_at })
    .eq("id", orgId)
    .select()
    .single();

  if (error || !data) {
    supabaseSpinner.fail("❌ Supabase update failed");
    throw error;
  }

  supabaseSpinner.succeed(`✅ "${data.name}" successfully updated in Supabase`);
}
