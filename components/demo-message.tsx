import { Button } from "@/components/ui/button";
import useGoogleSignIn from "@/hooks/use-google-sign-in";
import { isDemoMessageHiddenState } from "@/states/demo-state";
import { IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function DemoMessage() {
  const { signInWithGoogle } = useGoogleSignIn();
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(80);
  const isDemoMessageHidden = useRecoilValue(isDemoMessageHiddenState);
  const setIsDemoMessageHidden = useSetRecoilState(isDemoMessageHiddenState);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) setHeight(ref.current.scrollHeight);
    };

    window.addEventListener("resize", handleResize);

    // Call handleResize initially in case the window size is already below 768px
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={ref}
      className="flex justify-between overflow-hidden border-yellow-300 bg-yellow-50 pl-4 pr-1 text-yellow-700"
      style={{
        maxHeight: isDemoMessageHidden ? 0 : height,
        opacity: isDemoMessageHidden ? 0 : 1,
        transition: "max-height 0.5s, opacity 0.3s",
      }}
    >
      <p className="py-2">
        You are currently in demo mode. Feel free to add, edit, and delete
        projects and issues. All your changes will be lost once you leave the
        page. To save your items,{" "}
        <span onClick={signInWithGoogle} className="cursor-pointer underline">
          sign in
        </span>
        .
      </p>
      <Button
        variant="ghost"
        className="mx-2 h-auto rounded-full p-0 hover:bg-transparent"
        onClick={() => setIsDemoMessageHidden(true)}
      >
        <IconX size={16} />
      </Button>
    </div>
  );
}
