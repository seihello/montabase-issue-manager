import createClient from "@/lib/supabase/client";
import { Issue } from "../../types/issue.type";

export default async function getDummyIssues(): Promise<Issue[]> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from("dummy_issues").select("*");

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
