import createClient from "@/lib/supabase/client";

export default async function updateIssueTitle(
  issueId: string,
  newTitle: string,
): Promise<void> {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("issues")
      .update({ title: newTitle })
      .eq("id", issueId);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}
