import createClient from "@/lib/supabase/client";
import { Project } from "@/lib/types/project.type";

export default async function getAllProjects(
  userId: string,
): Promise<Project[]> {
  const supabase = createClient();

  try {
    const projectIdsRes = await supabase
      .from("project_members")
      .select("project_id")
      .eq("user_id", userId);

    if (projectIdsRes.error) {
      throw new Error(projectIdsRes.error.message);
    }

    if (!projectIdsRes.data) {
      return [];
    }

    const projectsRes = await supabase
      .from("projects")
      .select("*")
      .in(
        "id",
        projectIdsRes.data.map((row) => row.project_id),
      )
      .order("created_at", { ascending: true });

    if (projectsRes.error) {
      throw new Error(projectsRes.error.message);
    }

    return projectsRes.data;

    // return data.map((row) => ({
    //   ...row,
    //   planned_end_date: row.planned_end_date
    //     ? new Date(row.planned_end_date)
    //     : null,
    // }));
  } catch (error) {
    throw error;
  }
}
