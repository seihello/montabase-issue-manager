import createClient from "@/lib/supabase/client";
import getUser from "@/lib/supabase/get-user";
import { userState } from "@/states/user.state";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

type Props = {
  setIsLoadingUser: (value: boolean) => void;
};
export default function Auth({ setIsLoadingUser }: Props) {
  const setUser = useSetRecoilState(userState);
  useEffect(() => {
    const fetchUser = async () => {
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
