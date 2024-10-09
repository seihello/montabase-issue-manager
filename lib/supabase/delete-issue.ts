import createClient from "@/lib/supabase/client";

export default async function deleteIssue(issueId: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.from("issues").delete().eq("id", issueId);

  if (error) {
    throw new Error(error.message);
  }
}
