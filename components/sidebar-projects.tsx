import SidebarProject from "@/components/sidebar-project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import addProject from "@/lib/supabase/add-project";
import getAllProjects from "@/lib/supabase/get-all-projects";
import { projectsState } from "@/states/projects-state";
import { userState } from "@/states/user-state";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";

type Props = {
  selectedProjectId: string | undefined;
};

export default function SidebarProjects({ selectedProjectId }: Props) {
  const router = useRouter();

  const user = useRecoilValue(userState);
  const projects = useRecoilValue(projectsState);
  const setProjects = useSetRecoilState(projectsState);

  const [newProjectTitle, setNewProjectTitle] = useState<string | null>(null);
  const [isProjectTitleSelected, setIsProjectTitleSelected] =
    useState<boolean>(false);
  const newProjectTitleInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;
      try {
        const projects = await getAllProjects(user.id);
        setProjects(projects);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
  }, [user, setProjects]);

  const onClickedAddProjectButton = async () => {
    // const newProject = setProjects((oldProjects) => [...oldProjects, {}]);
    if (newProjectTitle === null) setNewProjectTitle("New Project");
  };

  useEffect(() => {
    if (newProjectTitleInput.current && !isProjectTitleSelected) {
      newProjectTitleInput.current.select();
      setIsProjectTitleSelected(true);
    }
  }, [newProjectTitle, isProjectTitleSelected]);

  useEffect(() => {
    const handleClickOutside = async (event: MouseEvent) => {
      if (!user) return;
      if (
        newProjectTitleInput.current &&
        !newProjectTitleInput.current.contains(event.target as Node) &&
        newProjectTitle
      ) {
        try {
          const newProject = await addProject(user.id, newProjectTitle);
          setNewProjectTitle(null);
          setIsProjectTitleSelected(false);

          setProjects((oldProjects) => [...oldProjects, newProject]);

          toast.success("Project created", {
            description: newProject.title,
            duration: 3000,
          });
        } catch (error) {
          console.error(error);

          toast.error("Error", {
            description: "Failed to add the project. Please try again.",
          });
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [user, newProjectTitleInput, newProjectTitle, setProjects]);

  return (
    <div className="relative mb-2 mt-4 border-none">
      <div className="mb-2 text-xs font-semibold text-gray-700 hover:no-underline">
        <span>Your projects</span>
      </div>
      <Button
        variant="ghost"
        onClick={onClickedAddProjectButton}
        className="absolute -top-[2px] right-0 h-auto w-auto p-1"
      >
        <IconPlus size={12} />
      </Button>
      {projects.map((project, index) => (
        <SidebarProject
          key={index}
          project={project}
          isSelected={project.id === selectedProjectId}
        />
      ))}

      {newProjectTitle !== null && (
        <Input
          ref={newProjectTitleInput}
          className={`h-8 w-full justify-start`}
          value={newProjectTitle}
          onChange={(e) => setNewProjectTitle(e.target.value)}
        />
      )}
    </div>
  );
}
