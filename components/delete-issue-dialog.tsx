import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import deleteIssue from "@/lib/supabase/delete-issue";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  issueId: string;
  issueTitle: string;
  isOverview?: boolean;
};

export default function DeleteIssueDialog({
  issueId,
  issueTitle,
  isOverview = false,
}: Props) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const onClickDeleteIssue = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

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
      <Button
        variant="destructive"
        className={`${isOverview ? "h-6 w-[32px] px-2 py-1" : "mt-16"}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        {isOverview ? <IconTrash size={16} /> : "Delete this issue"}
      </Button>

      <DialogContent className="w-144">
        <DialogTitle>{`Are you sure you want to delete "${issueTitle}"?`}</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
        <div className="flex justify-end gap-x-2">
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
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
