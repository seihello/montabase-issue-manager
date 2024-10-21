import AddProjectDialog from "@/components/add-project-dialog";
import SidebarProject from "@/components/sidebar-project";
import { Input } from "@/components/ui/input";
import getDummyProjects from "@/lib/supabase/demo/get-dummy-projects";
import getAllProjects from "@/lib/supabase/get-all-projects";
import { projectsState } from "@/states/projects-state";
import { isLoadingUserState, userState } from "@/states/user-state";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

type Props = {
  selectedProjectId: string | undefined;
};

export default function SidebarProjects({ selectedProjectId }: Props) {
  const user = useRecoilValue(userState);
  const isLoadingUser = useRecoilValue(isLoadingUserState);
  const projects = useRecoilValue(projectsState);
  const setProjects = useSetRecoilState(projectsState);

  const [isLoadingProjects, setIsLoadingProjects] = useState<boolean>(true);

  const [newProjectTitle, setNewProjectTitle] = useState<string | null>(null);
  const [isProjectTitleSelected, setIsProjectTitleSelected] =
    useState<boolean>(false);
  const newProjectTitleInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (isLoadingUser) return;
      try {
        if (projects.length === 0) {
          setIsLoadingProjects(true);
          if (user) {
            const projects = await getAllProjects(user.id);
            setProjects(projects);
          } else {
            const dummyProjects = await getDummyProjects();
            setProjects(dummyProjects);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingProjects(false);
      }
    };
    fetchProjects();
  }, [user, isLoadingUser, setProjects]);

  return (
    <div className="relative mb-2 mt-4 border-none">
      <div className="mb-2 text-xs font-semibold text-gray-700 hover:no-underline">
        <span>Your projects</span>
      </div>
      <AddProjectDialog />
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
