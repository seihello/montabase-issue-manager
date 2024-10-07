import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import getAllProjects from "@/lib/supabase/get-all-projects";
import { projectsState } from "@/states/projects-state";
import { userState } from "@/states/user-state";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function SidebarProjects() {
  const router = useRouter();

  const user = useRecoilValue(userState);
  const projects = useRecoilValue(projectsState);
  const setProjects = useSetRecoilState(projectsState);

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
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="projects"
    >
      <AccordionItem value="projects" className="border-none">
        <AccordionTrigger className="text-xs font-semibold text-gray-700 hover:no-underline">
          Your projects
        </AccordionTrigger>
        {projects.map((project, index) => (
          <AccordionContent key={index} asChild>
            <Button
              variant="ghost"
              className="h-8 w-full justify-start"
              onClick={() => router.push(`/projects/${project.id}`)}
            >
              <span className="truncate">{project.title}</span>
            </Button>
          </AccordionContent>
        ))}
      </AccordionItem>
    </Accordion>
  );
}
