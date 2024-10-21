import { Button } from "@/components/ui/button";
import createClient from "@/lib/supabase/client";
import { issuesState } from "@/states/issues-state";
import { projectsState } from "@/states/projects-state";
import { userState } from "@/states/user-state";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

export default function SignOutButton() {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  const setIssues = useSetRecoilState(issuesState);
  const setProjects = useSetRecoilState(projectsState);

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
        setProjects([]);

        router.push("/project/all");
      }}
      className="h-8"
    >
      Sign out
    </Button>
  );
}
