import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import getAllProjects from "@/lib/supabase/get-all-projects";
import { projectsState } from "@/states/projects-state";
import { userState } from "@/states/user-state";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function SidebarProjects() {
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

  const addProject = async () => {
    // const newProject = setProjects((oldProjects) => [...oldProjects, {}]);
    setNewProjectTitle("New Project");
  };

  useEffect(() => {
    if (newProjectTitleInput.current && !isProjectTitleSelected) {
      newProjectTitleInput.current.select();
      setIsProjectTitleSelected(true);
    }
  }, [newProjectTitle, isProjectTitleSelected]);

  return (
    <div className="relative mb-2 mt-4 border-none">
      <div className="mb-2 text-xs font-semibold text-gray-700 hover:no-underline">
        <span>Your projects</span>
      </div>
      <Button
        variant="ghost"
        onClick={addProject}
        className="absolute -top-[2px] right-0 h-auto w-auto p-1"
      >
        <IconPlus size={12} />
      </Button>
      {projects.map((project, index) => (
        <div key={index}>
          <Button
            variant="ghost"
            className="h-8 w-full justify-start"
            onClick={() => router.push(`/projects/${project.id}`)}
          >
            <span className="truncate">{project.title}</span>
          </Button>
        </div>
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
