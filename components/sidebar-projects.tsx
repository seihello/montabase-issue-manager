import SidebarProject from "@/components/sidebar-project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import addProject from "@/lib/supabase/add-project";
import getDummyProjects from "@/lib/supabase/demo/get-dummy-projects";
import getAllProjects from "@/lib/supabase/get-all-projects";
import { Project } from "@/lib/types/project.type";
import { projectsState } from "@/states/projects-state";
import { isLoadingUserState, userState } from "@/states/user-state";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

type Props = {
  selectedProjectId: string | undefined;
};

export default function SidebarProjects({ selectedProjectId }: Props) {
  const router = useRouter();

  const user = useRecoilValue(userState);
  const isLoadingUser = useRecoilValue(isLoadingUserState);
  const projects = useRecoilValue(projectsState);
  const setProjects = useSetRecoilState(projectsState);

  const [newProjectTitle, setNewProjectTitle] = useState<string | null>(null);
  const [isProjectTitleSelected, setIsProjectTitleSelected] =
    useState<boolean>(false);
  const newProjectTitleInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (isLoadingUser) return;
      try {
        if (user) {
          const projects = await getAllProjects(user.id);
          setProjects(projects);
        } else {
          if (projects.length === 0) {
            const dummyProjects = await getDummyProjects();
            setProjects(dummyProjects);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
  }, [user, isLoadingUser, setProjects]);

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
      if (
        newProjectTitleInput.current &&
        !newProjectTitleInput.current.contains(event.target as Node) &&
        newProjectTitle
      ) {
        try {
          const newProject: Project = user
            ? await addProject(user.id, newProjectTitle)
            : {
                id: uuidv4(),
                title: newProjectTitle,
              };

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
