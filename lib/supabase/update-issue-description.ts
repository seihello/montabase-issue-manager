import createClient from "@/lib/supabase/client";

export default async function updateIssueDescription(
  issueId: string,
  newDescription: string,
): Promise<void> {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("issues")
      .update({ description: newDescription })
      .eq("id", issueId);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}
