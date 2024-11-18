import createClient from "@/lib/supabase/client";
import { Project } from "@/lib/types/project.type";

export default async function addProject(
  userId: string,
  title: string,
): Promise<Project> {
  const supabase = createClient();

  try {
    const projectRes = await supabase
      .from("projects")
      .insert({
        title,
        author: userId,
      })
      .select("*")
      .single();

    if (projectRes.error) {
      throw new Error(projectRes.error.message);
    }

    if (!projectRes.data) {
      throw new Error("New issue not found");
    }

    const projectMemberRes = await supabase.from("project_members").insert({
      project_id: projectRes.data.id,
      user_id: userId,
    });

    if (projectMemberRes.error) {
      throw new Error(projectMemberRes.error.message);
    }

    return projectRes.data;
  } catch (error) {
    throw error;
  }
}
