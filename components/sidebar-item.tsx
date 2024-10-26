import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  icon: React.JSX.Element;
  label: string;
  link?: string;
  pathname?: string;
  onClick?: () => void;
};

export default function SidebarItem({
  icon,
  label,
  link,
  pathname,
  onClick,
}: Props) {
  if (!link && !onClick) {
    throw new Error("Either link or onClick is required.");
  }

  const router = useRouter();
  return (
    <Button
      variant="ghost"
      className={`h-8 justify-start gap-x-2 px-0 ${pathname === link ? "bg-blue-100 hover:bg-blue-100" : ""}`}
      onClick={() => {
        if (link) {
          router.push(link);
        } else if (onClick) {
          onClick();
        }
      }}
    >
      {icon}
      {label}
    </Button>
  );
}
