import createClient from "@/lib/supabase/client";
import { Issue } from "../types/issue.type";

export default async function getAllIssues(userId: string): Promise<Issue[]> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("issues")
      .select("*")
      .eq("author", userId);

    if (error) {
      throw new Error(error.message);
    }

    return data.map((row) => ({
      ...row,
      planned_start_date: row.planned_start_date
        ? new Date(row.planned_start_date)
        : null,
    }));
  } catch (error) {
    throw error;
  }
}
