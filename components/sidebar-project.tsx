import ProjectMenu from "@/components/project-menu";
import { Project } from "@/lib/types/project.type";
import { useRouter } from "next/navigation";

type Props = {
  project: Project;
  isSelected: boolean;
};

export default function SidebarProject({ project, isSelected }: Props) {
  const router = useRouter();

  return (
    <div
      className={`relative inline-flex h-8 w-full cursor-pointer items-center justify-start whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isSelected ? "bg-blue-100" : "hover:bg-accent"}`}
      onClick={() => router.push(`/project/${project.id}`)}
    >
      <span className="truncate">{project.title}</span>
      <ProjectMenu projectId={project.id} projectTitle={project.title} />
    </div>
  );
}
