import createClient from "@/lib/supabase/client";

export default async function updateProjectTitle(
  projectId: string,
  newTitle: string,
): Promise<void> {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("projects")
      .update({ title: newTitle })
      .eq("id", projectId);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}
