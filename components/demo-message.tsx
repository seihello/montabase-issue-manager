import { Button } from "@/components/ui/button";
import { isDemoMessageHiddenState } from "@/states/demo-state";
import { IconX } from "@tabler/icons-react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function DemoMessage() {
  // const [isHidden, setIsHidden] = useState(false);
  const isDemoMessageHidden = useRecoilValue(isDemoMessageHiddenState);
  const setIsDemoMessageHidden = useSetRecoilState(isDemoMessageHiddenState);

  if (isDemoMessageHidden) return;
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
          This is a demo mode. Feel free to add projects and issues. Please note
          that all your changes will be lost once you leave the page. Please
          sign in with Google to save your items.
        </p>
        <Button
          variant="ghost"
          className="h-8 rounded-full px-2 hover:bg-transparent"
          onClick={() => setIsDemoMessageHidden(true)}
        >
          <IconX size={16} />
        </Button>
      </div>
    </div>
  );
}
