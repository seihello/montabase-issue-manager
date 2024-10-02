import createClient from "@/lib/supabase/client";
import { IssuePriority } from "@/lib/types/issue-priority.enum";

export default async function updateIssuePriority(
  issueId: string,
  newPriority: IssuePriority,
): Promise<void> {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("issues")
      .update({ priority: newPriority })
      .eq("id", issueId);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}
