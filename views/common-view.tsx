import DemoMessage from "@/components/demo-message";
import Sidebar from "@/components/sidebar";
import { isLoadingUserState, userState } from "@/states/user-state";
import { useRecoilValue } from "recoil";

type Props = {
  children: React.ReactNode;
};

export default function CommonView({ children }: Props) {
  const user = useRecoilValue(userState);
  const isLoadingUser = useRecoilValue(isLoadingUserState);

  return (
    <>
      <Sidebar />
      <main
        className="flex h-screen flex-1 flex-col bg-white transition-[width]"
        style={{
          overflowX: "scroll",
        }}
      >
        {!isLoadingUser && !user && <DemoMessage />}
        <div className="flex min-h-0 flex-1 flex-col gap-y-2 overflow-y-scroll p-2">
          {children}
        </div>
      </main>
    </>
  );
}
