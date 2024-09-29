import createClient from "@/lib/supabase/client";
import { IssueStatus } from "@/lib/types/issue-status.enum";

export default async function updateIssueStatus(
  issueId: string,
  newStatus: IssueStatus,
): Promise<void> {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("issues")
      .update({ status: newStatus })
      .eq("id", issueId);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}
