import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import deleteProject from "@/lib/supabase/delete-project";
import { projectsState } from "@/states/projects-state";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";

type Props = {
  projectId: string;
  projectTitle: string;
};

export default function DeleteProjectDialog({
  projectId,
  projectTitle,
}: Props) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const setProjects = useSetRecoilState(projectsState);

  const onClickDeleteProject = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();

    try {
      await deleteProject(projectId);
      toast.success("Project deleted", {
        description: projectTitle,
        duration: 3000,
      });

      setIsOpen(false);

      setProjects((oldProjects) =>
        oldProjects.filter((oldProject) => oldProject.id !== projectId),
      );
    } catch (error) {
      toast.error("Error", {
        description: "Failed to delete the project. Please try again.",
      });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="destructive"
        className="absolute right-0 top-1/2 h-6 w-[32px] -translate-y-1/2 px-2 py-1"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        <IconTrash size={16} />
      </Button>

      <DialogContent className="w-144">
        <DialogTitle>{`Are you sure you want to delete "${projectTitle}"?`}</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers. All issues linked to
          this project will also be deleted.
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
          <Button variant="destructive" onClick={onClickDeleteProject}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
