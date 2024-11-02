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
        className="flex min-h-screen flex-1 flex-col bg-white"
        style={{
          overflowX: "scroll",
        }}
      >
        {!isLoadingUser && !user && <DemoMessage />}
        <div className="flex flex-1 flex-col gap-y-2 p-4">{children}</div>
      </main>
    </>
  );
}
