"use client";
import Breadcrumbs from "@/components/breadcrumbs";
import getIssuesByProjectId from "@/lib/supabase/get-issues-by-project-id";
import getProjectById from "@/lib/supabase/get-project-by-id";
import { Project } from "@/lib/types/project.type";
import { issuesState } from "@/states/issues-state";
import IssuesView from "@/views/issues-view";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

export default function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const setIssues = useSetRecoilState(issuesState);
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    const fetchProject = async () => {
      const project = await getProjectById(params.projectId);
      setProject(project);
    };
    fetchProject();
  }, [params.projectId, setIssues]);

  useEffect(() => {
    const fetchIssues = async () => {
      // TODO: verify the user to avoid fetching issues not related to this user
      const issues = await getIssuesByProjectId(params.projectId);
      setIssues(issues);
    };
    fetchIssues();
  }, [params.projectId, setIssues]);

  if (!project) return;

  return (
    <>
      <Breadcrumbs
        isAllProjects={false}
        projectId={project.id}
        projectTitle={project.title}
        isAllIssues={true}
      />
      <IssuesView />
    </>
  );
}
