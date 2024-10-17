import DeleteProjectDialog from "@/components/delete-project-dialog";
import { Project } from "@/lib/types/project.type";
import { useRouter } from "next/navigation";

type Props = {
  project: Project;
};

export default function SidebarProject({ project }: Props) {
  const router = useRouter();
  return (
    <div
      className="sidebar-project relative inline-flex h-8 w-full cursor-pointer items-center justify-start whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      onClick={() => router.push(`/project/${project.id}`)}
    >
      <span className="truncate">{project.title}</span>
      <DeleteProjectDialog
        projectId={project.id}
        projectTitle={project.title}
      />
    </div>
  );
}
