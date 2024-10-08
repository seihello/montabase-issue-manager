import createClient from "@/lib/supabase/client";

export default async function updateIssueProjectId(
  issueId: string,
  newProjectId: string | null,
): Promise<void> {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("issues")
      .update({ project_id: newProjectId })
      .eq("id", issueId);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}
