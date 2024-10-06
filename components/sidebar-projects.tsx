import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import getAllProjects from "@/lib/supabase/get-all-projects";
import { projectsState } from "@/states/projects-state";
import { userState } from "@/states/user-state";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function SidebarProjects() {
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
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="projects" className="border-none">
        <AccordionTrigger className="hover:no-underline">
          Your projects
        </AccordionTrigger>
        {projects.map((project, index) => (
          <AccordionContent key={index}>{project.title}</AccordionContent>
        ))}
      </AccordionItem>
    </Accordion>
  );
}
