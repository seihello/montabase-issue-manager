import createClient from "@/lib/supabase/client";
import { Issue } from "@/lib/types/issue.type";

export default async function updateIssueStatus(issue: Issue): Promise<void> {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("issues")
      .update({
        title: issue.title,
        description: issue.description,
        status: issue.status,
        priority: issue.priority,
        planned_start_date: issue.planned_start_date,
      })
      .eq("id", issue.id);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}
