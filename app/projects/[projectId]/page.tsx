import IssuesView from "@/views/issues-view";

export default function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  return <IssuesView projectId={params.projectId} />;
}
