import createClient from "@/lib/supabase/client";

export default function useGoogleSignIn() {
  const signInWithGoogle = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error(error);
      return;
    }
  };

  return {
    signInWithGoogle,
  };
}
