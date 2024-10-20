"use client";
import Breadcrumbs from "@/components/breadcrumbs";
import BreadcrumbsSkeleton from "@/components/breadcrumbs-skeleton";
import getIssuesByProjectId from "@/lib/supabase/get-issues-by-project-id";
import getProjectById from "@/lib/supabase/get-project-by-id";
import { Project } from "@/lib/types/project.type";
import { issuesState } from "@/states/issues-state";
import { isLoadingUserState, userState } from "@/states/user-state";
import CommonView from "@/views/common-view";
import IssuesView from "@/views/issues-view";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function SingleProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const setIssues = useSetRecoilState(issuesState);
  const user = useRecoilValue(userState);
  const isLoadingUser = useRecoilValue(isLoadingUserState);
  const [project, setProject] = useState<Project>();
  const [isLoadingProject, setIsLoadingProject] = useState<boolean>(true);
  const [isLoadingIssues, setIsLoadingIssues] = useState<boolean>(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (isLoadingUser) return;
      try {
        setIsLoadingProject(true);

        if (user) {
          const project = await getProjectById(params.projectId);
          setProject(project);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingProject(false);
      }
    };
    fetchProject();
  }, [user, isLoadingUser, params.projectId, setIssues]);

  useEffect(() => {
    const fetchIssues = async () => {
      // TODO: verify the user to avoid fetching issues not related to this user
      try {
        setIsLoadingIssues(true);
        const issues = await getIssuesByProjectId(params.projectId);
        setIssues(issues);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingIssues(false);
      }
    };
    fetchIssues();
  }, [params.projectId, setIssues]);

  // if (!project) return;

  return (
    <CommonView>
      {!isLoadingProject && project ? (
        <Breadcrumbs
          isAllProjects={false}
          projectId={project.id}
          projectTitle={project.title}
          isAllIssues={true}
        />
      ) : (
        <BreadcrumbsSkeleton />
      )}
      <IssuesView
        isLoading={isLoadingProject || isLoadingIssues}
        projectId={params.projectId}
      />
    </CommonView>
  );
}
