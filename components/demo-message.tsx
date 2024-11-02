import { Button } from "@/components/ui/button";
import useGoogleSignIn from "@/hooks/use-google-sign-in";
import { isDemoMessageHiddenState } from "@/states/demo-state";
import { IconX } from "@tabler/icons-react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function DemoMessage() {
  const { signInWithGoogle } = useGoogleSignIn();
  // const [isHidden, setIsHidden] = useState(false);
  const isDemoMessageHidden = useRecoilValue(isDemoMessageHiddenState);
  const setIsDemoMessageHidden = useSetRecoilState(isDemoMessageHiddenState);

  if (isDemoMessageHidden) return;

  return (
    <div className="flex items-center justify-between border-y-[1px] border-yellow-300 bg-yellow-50 py-1 pl-4 pr-1 text-yellow-700">
      <p>
        This is a demo mode. Feel free to add projects and issues. Please note
        that all your changes will be lost once you leave the page. Please{" "}
        <span onClick={signInWithGoogle} className="cursor-pointer underline">
          sign in with Google
        </span>{" "}
        to save your items.
      </p>
      <Button
        variant="ghost"
        className="h-8 rounded-full px-2 hover:bg-transparent"
        onClick={() => setIsDemoMessageHidden(true)}
      >
        <IconX size={16} />
      </Button>
    </div>
  );
}
