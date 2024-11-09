import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import deleteProject from "@/lib/supabase/delete-project";
import { projectsState } from "@/states/projects-state";
import { userState } from "@/states/user-state";
import { useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";

type Props = {
  projectId: string;
  projectTitle: string;
  isSelected: boolean;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function DeleteProjectDialog({
  projectId,
  projectTitle,
  isSelected,
  isOpen,
  setIsOpen,
}: Props) {
  const router = useRouter();

  const user = useRecoilValue(userState);

  const setProjects = useSetRecoilState(projectsState);

  const onClickDeleteProject = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();

    try {
      if (user) await deleteProject(projectId);

      setProjects((oldProjects) =>
        oldProjects.filter((oldProject) => oldProject.id !== projectId),
      );

      setIsOpen(false);

      toast.success("Project deleted", {
        description: projectTitle,
        duration: 3000,
      });

      if (isSelected) router.push("/project/all");
    } catch (error) {
      toast.error("Error", {
        description: "Failed to delete the project. Please try again.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
