import createClient from "@/lib/supabase/client";
import { Project } from "@/lib/types/project.type";

export default async function getDummyProjects(): Promise<Project[]> {
  const supabase = createClient();

  try {
    const projectsRes = await supabase.from("dummy_projects").select("*");

    if (projectsRes.error) {
      throw new Error(projectsRes.error.message);
    }

    return projectsRes.data;
  } catch (error) {
    throw error;
  }
}
