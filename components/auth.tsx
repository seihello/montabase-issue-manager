import createClient from "@/lib/supabase/client";
import getUser from "@/lib/supabase/get-user";
import { isLoadingUserState, userState } from "@/states/user-state";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Auth() {
  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);
  const setIsLoadingUser = useSetRecoilState(isLoadingUserState);
  useEffect(() => {
    const fetchUser = async () => {
      if (user) return;
      try {
        setIsLoadingUser(true);

        const supabase = createClient();
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error(error.message);
          return;
        }

        if (!data.session) {
          console.error("No session");
          return;
        }

        const user = await getUser(data.session.user.id);

        console.log("getUser");

        setUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  return <></>;
}
