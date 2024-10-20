import createClient from "@/lib/supabase/client";
import { Issue } from "@/lib/types/issue.type";

export default async function getDummyIssuesByProjectId(
  projectId: string,
): Promise<Issue[]> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("dummy_issues")
      .select("*")
      .eq("project_id", projectId);

    if (error) {
      throw new Error(error.message);
    }

    return data.map((row) => ({
      ...row,
      planned_end_date: row.planned_end_date
        ? new Date(row.planned_end_date)
        : null,
    }));
  } catch (error) {
    throw error;
  }
}
