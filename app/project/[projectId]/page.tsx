"use client";
import IssuesView from "@/views/issues-view";

export default function SingleProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  return <IssuesView projectId={params.projectId} />;
}
