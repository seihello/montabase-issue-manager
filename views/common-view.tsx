import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";

type Props = {
  children: React.ReactNode;
};

export default function CommonView({ children }: Props) {
  return (
    <>
      <Sidebar />
      <main
        className="flex min-h-screen flex-1 flex-col gap-y-2 bg-white p-4"
        style={{
          overflowX: "scroll",
        }}
      >
        <Toaster richColors closeButton />
        {children}
      </main>
    </>
  );
}
