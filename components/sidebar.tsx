import GoogleSignInButton from "./google-sign-in-button";

export default function Sidebar() {
  return (
    <aside>
      <div className="h-screen w-56"></div>
      <nav className="p-2 fixed left-0 top-0 flex h-screen w-56 flex-col border-r bg-white">
        <div className="flex-1">This is sidebar</div>
        <GoogleSignInButton />
      </nav>
    </aside>
  );
}
