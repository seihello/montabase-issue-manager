type Props = {
  children: React.ReactNode;
};

export default function CommonView({ children }: Props) {
  return (
    <main className="flex min-h-screen flex-1 flex-col gap-y-2 overflow-x-scroll bg-white p-4">
      {children}
    </main>
  );
}
