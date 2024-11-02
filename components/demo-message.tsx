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

  console.log("height", height);

  return (
    <div
      ref={ref}
      className="flex items-center justify-between overflow-hidden border-yellow-300 bg-yellow-50 pl-4 pr-1 text-yellow-700"
      style={{
        maxHeight: isDemoMessageHidden ? 0 : height,
        transition: "max-height 0.5s",
      }}
    >
      <p>
        This is a demo mode. Feel free to add projects and issues. Note that all
        your changes will be lost once you leave the page. To save your items,{" "}
        <span onClick={signInWithGoogle} className="cursor-pointer underline">
          sign in with Google
        </span>
        .
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
