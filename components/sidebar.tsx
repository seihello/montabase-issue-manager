import AddIssueDialog from "@/components/add-issue-dialog";
import GoogleSignInButton from "@/components/google-sign-in-button";
import SignOutButton from "@/components/sign-out-button";
import { userState } from "@/states/user.state";
import Image from "next/image";
import { useRecoilValue } from "recoil";

type Props = {
  isLoadingUser: boolean;
};

export default function Sidebar({ isLoadingUser }: Props) {
  const user = useRecoilValue(userState);

  return (
    <aside>
      <div className="h-screen w-56"></div>
      <nav className="fixed left-0 top-0 flex h-screen w-56 flex-col items-stretch border-r bg-white p-2">
        <div className="flex flex-1 flex-col items-end">
          <AddIssueDialog />
        </div>
        <div className="flex flex-col items-stretch gap-y-2">
          {user && (
            <div className="flex items-center gap-x-2">
              {user.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt="profile_avatar"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : (
                <div></div>
              )}
              <span>{user.name}</span>
            </div>
          )}
          {isLoadingUser ? null : user ? (
            <SignOutButton />
          ) : (
            <GoogleSignInButton />
          )}
        </div>
      </nav>
    </aside>
  );
}
