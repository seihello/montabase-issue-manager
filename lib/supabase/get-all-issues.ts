import createClient from "@/lib/supabase/client";

export default async function getAllIssues(): Promise<unknown[]> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from("issues").select("*");

    if (error) {
      throw new Error(error.message);
    }

    console.log("data", data);

    return data;
  } catch (error) {
    throw error;
  }
}
