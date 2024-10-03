import createClient from "@/lib/supabase/client";

export default async function updateIssuePlannedEndDate(
  issueId: string,
  plannedEndDate: Date | null,
): Promise<void> {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("issues")
      .update({ planned_end_date: plannedEndDate })
      .eq("id", issueId);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}
