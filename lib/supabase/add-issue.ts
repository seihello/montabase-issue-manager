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
  plannedEndDate: Date | null,
  projectId: string | null,
): Promise<Issue> {
  const supabase = createClient();
  console.log("projectId", projectId);
  

  try {
    const { data, error } = await supabase
      .from("issues")
      .insert({
        title,
        description,
        status,
        priority,
        planned_end_date: plannedEndDate,
        project_id: projectId,
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
