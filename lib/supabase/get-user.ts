import createClient from "@/lib/supabase/client";
import { User } from "@/lib/types/user.type";

export default async function getUser(userId: string): Promise<User> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}
