import createClient from "@/lib/supabase/client";
import { Issue } from "../types/issue.type";

export default async function getProjectById(
  projectId: string,
): Promise<Issue> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}
