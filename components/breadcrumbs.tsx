import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

type Props = {
  isAllProjects: boolean;
  projectId?: string;
  projectTitle?: string;
  isAllIssues: boolean;
  issueId?: string;
  issueTitle?: string;
};

export default function Breadcrumbs({
  isAllProjects,
  projectId,
  projectTitle,
  isAllIssues,
  issueId,
  issueTitle,
}: Props) {
  if (!isAllProjects && (!projectId || !projectTitle))
    throw new Error("Provide the project data");
  if (!isAllIssues && (!issueId || !issueTitle))
    throw new Error("Provide the issue data");

  const router = useRouter();
  return (
    <div className="flex items-center gap-x-1 px-2">
      <div
        className="cursor-pointer hover:underline"
        onClick={() => {
          if (isAllProjects) {
            router.push("/");
          } else {
            router.push(`/projects/${projectId}`);
          }
        }}
      >
        {isAllProjects ? "All Projects" : projectTitle}
      </div>
      <IconChevronRight size={16} className="mb-[2px]" />
      <div>{isAllIssues ? "All Issues" : issueTitle}</div>
    </div>
  );
}
