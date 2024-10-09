import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import deleteIssue from "@/lib/supabase/delete-issue";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  issueId: string;
  issueTitle: string;
};

export default function DeleteIssueDialog({ issueId, issueTitle }: Props) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const onClickDeleteIssue = async () => {
    try {
      await deleteIssue(issueId);
      toast.success("Issue deleted", {
        description: issueTitle,
        duration: 3000,
      });
      
      setIsOpen(false);

      // TODO: Might be better to redirect to the top of the same project
      router.push("/");
    } catch (error) {
      toast.error("Error", {
        description: "Failed to delete the issue. Please try again.",
      });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="mt-16">
          Delete this issue
        </Button>
      </DialogTrigger>
      <DialogContent className="w- w-144">
        <DialogTitle>{`Are you sure you want to delete "${issueTitle}"?`}</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
        <div className="flex justify-end gap-x-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onClickDeleteIssue}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
