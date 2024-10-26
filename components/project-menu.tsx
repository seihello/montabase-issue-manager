import DeleteProjectDialog from "@/components/delete-project-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDots, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

type Props = {
  projectId: string;
  projectTitle: string;
};

export default function ProjectMenu({ projectId, projectTitle }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteProjectDialogOpen, setIsDeleteProjectDialogOpen] =
    useState(false);
  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="absolute right-0 top-1/2 h-6 w-[32px] -translate-y-1/2 px-2 py-1 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <IconDots size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuItem>
            <IconPencil size={16} />
            <span>Rename</span>
          </DropdownMenuItem> */}
          <DropdownMenuItem
            onSelect={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              setIsDeleteProjectDialogOpen(true);
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <IconTrash size={16} />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteProjectDialog
        projectId={projectId}
        projectTitle={projectTitle}
        isOpen={isDeleteProjectDialogOpen}
        setIsOpen={setIsDeleteProjectDialogOpen}
      />
    </>
  );
}
