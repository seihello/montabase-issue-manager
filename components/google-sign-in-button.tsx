"use client";
import { Button } from "@/components/ui/button";
import useGoogleSignIn from "@/hooks/use-google-sign-in";

type Props = {
  sidebarWidth: number;
};
export default function GoogleSignInButton({ sidebarWidth }: Props) {
  const { signInWithGoogle } = useGoogleSignIn();
  return (
    <Button
      variant="outline"
      onClick={signInWithGoogle}
      className="flex gap-x-2"
    >
      <img
        className="h-3/4"
        src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
      />
      <span className="!font-normal">
        {sidebarWidth <= 176 ? "Sign In" : "Sign In with Google"}
      </span>
    </Button>
  );
}
