import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";

type Props = {
  children: React.ReactNode;
};

export default function CommonView({ children }: Props) {
  return (
    <>
      <Sidebar />
      <main className="flex min-h-screen flex-1 flex-col gap-y-2 overflow-x-scroll bg-white p-4">
        <Toaster richColors closeButton />
        {children}
      </main>
    </>
  );
}
