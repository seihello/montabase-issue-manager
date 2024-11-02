import DemoMessage from "@/components/demo-message";
import Sidebar from "@/components/sidebar";

type Props = {
  children: React.ReactNode;
};

export default function CommonView({ children }: Props) {
  return (
    <>
      <Sidebar />
      <main
        className="flex min-h-screen flex-1 flex-col gap-y-2 bg-white"
        style={{
          overflowX: "scroll",
        }}
      >
        <DemoMessage />
        <div className="p-4">{children}</div>
      </main>
    </>
  );
}
