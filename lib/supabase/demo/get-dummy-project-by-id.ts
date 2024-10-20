import createClient from "@/lib/supabase/client";
import { Project } from "@/lib/types/project.type";

export default async function getDummyProjectById(
  projectId: string,
): Promise<Project> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("dummy_projects")
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
