import createClient from "@/lib/supabase/client";
import { IssuePriority } from "@/lib/types/issue-priority.enum";
import { IssueStatus } from "@/lib/types/issue-status.enum";
import { Issue } from "@/lib/types/issue.type";

export default async function addIssue(
  userId: string,
  title: string,
  description: string,
  status: IssueStatus,
  priority: IssuePriority | null,
  planned_start_date: Date | null,
): Promise<Issue> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("issues")
      .insert({
        title,
        description,
        status,
        priority,
        planned_start_date,
        author: userId,
      })
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("New issue not found");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
