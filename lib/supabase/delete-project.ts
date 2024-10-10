import createClient from "@/lib/supabase/client";

export default async function deleteProject(projectId: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) {
    throw new Error(error.message);
  }
}
