import { Button } from "@/components/ui/button";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function DemoMessage() {
  const [isHidden, setIsHidden] = useState(false);

  if (isHidden) return;
  return (
    <div
      className="absolute -right-2 top-1/2 flex -translate-y-1/2 translate-x-full items-center"
      style={{
        width: "calc(100vw - 13rem)",
      }}
    >
      <div className="border-[8px] border-transparent border-r-yellow-100" />
      <div className="flex flex-1 items-center justify-between rounded-md bg-yellow-100 py-1 pl-4 pr-1">
        <p>
          This is a demo mode. While you are able to add projects and issues,
          they will be lost once you leave the page. Please sign in with Google
          to save your items.
        </p>
        <Button
          variant="ghost"
          className="h-8 rounded-full px-2 hover:bg-transparent"
          onClick={() => setIsHidden(true)}
        >
          <IconX size={16} />
        </Button>
      </div>
    </div>
  );
}
