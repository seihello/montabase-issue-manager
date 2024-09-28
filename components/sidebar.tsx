import AddIssueDialog from "@/components/add-issue-dialog";
import GoogleSignInButton from "@/components/google-sign-in-button";

export default function Sidebar() {
  return (
    <aside>
      <div className="h-screen w-56"></div>
      <nav className="fixed left-0 top-0 flex h-screen w-56 flex-col items-stretch border-r bg-white p-2">
        <div className="flex flex-1 flex-col items-end">
          <AddIssueDialog />
        </div>
        <GoogleSignInButton />
      </nav>
    </aside>
  );
}
