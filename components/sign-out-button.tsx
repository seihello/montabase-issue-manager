import { Button } from "@/components/ui/button";
import createClient from "@/lib/supabase/client";
import { issuesState } from "@/states/issues-state";
import { userState } from "@/states/user-state";
import { useSetRecoilState } from "recoil";

export default function SignOutButton() {
  const setUser = useSetRecoilState(userState);
  const setIssues = useSetRecoilState(issuesState);

  return (
    <Button
      variant="outline"
      onClick={async () => {
        const supabase = createClient();
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error(error.message);
        }
        setUser(null);
        setIssues([]);
      }}
      className="h-8"
    >
      Sign out
    </Button>
  );
}
