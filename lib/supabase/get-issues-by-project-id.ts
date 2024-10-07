import createClient from "@/lib/supabase/client";
import { Issue } from "../types/issue.type";

export default async function getIssuesByProjectId(
  projectId: string,
): Promise<Issue[]> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("issues")
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
