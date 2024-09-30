import AddIssueDialog from "@/components/add-issue-dialog";
import GoogleSignInButton from "@/components/google-sign-in-button";
import SignOutButton from "@/components/sign-out-button";
import { userState } from "@/states/user.state";
import { useRecoilValue } from "recoil";

export default function Sidebar() {
  const user = useRecoilValue(userState);

  console.log("user", user);

  return (
    <aside>
      <div className="h-screen w-56"></div>
      <nav className="fixed left-0 top-0 flex h-screen w-56 flex-col items-stretch border-r bg-white p-2">
        <div className="flex flex-1 flex-col items-end">
          <AddIssueDialog />
        </div>
        {user ? <SignOutButton /> : <GoogleSignInButton />}
      </nav>
    </aside>
  );
}
