import { Button } from "@/components/ui/button";
import createClient from "@/lib/supabase/client";
import { userState } from "@/states/user.state";
import { useSetRecoilState } from "recoil";

export default function SignOutButton() {
  const setUser = useSetRecoilState(userState);

  return (
    <Button
      onClick={async () => {
        const supabase = createClient();
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error(error.message);
        }
        setUser(null);
      }}
    >
      Sign out
    </Button>
  );
}
