import createClient from "@/lib/supabase/client";
import { IssuePriority } from "@/lib/types/issue-priority.enum";
import { IssueStatus } from "@/lib/types/issue-status.enum";
import { Issue } from "@/lib/types/issue.type";

export default async function addIssue(
  title: string,
  description: string,
  status: IssueStatus,
  priority: IssuePriority | null,
): Promise<Issue> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("issues")
      .insert({ title, description, status, priority })
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
