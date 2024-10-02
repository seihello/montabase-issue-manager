import createClient from "@/lib/supabase/client";

export default async function updateIssuePlannedStartDate(
  issueId: string,
  plannedDate: Date | null,
): Promise<void> {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("issues")
      .update({ planned_start_date: plannedDate })
      .eq("id", issueId);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}
