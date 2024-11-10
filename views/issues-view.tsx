"use client";
import Breadcrumbs from "@/components/breadcrumbs";
import BreadcrumbsSkeleton from "@/components/breadcrumbs-skeleton";
import StatusIssues from "@/components/status-issues";
import getDummyIssues from "@/lib/supabase/demo/get-dummy-issues";
import getDummyProjectById from "@/lib/supabase/demo/get-dummy-project-by-id";
import getAllIssues from "@/lib/supabase/get-all-issues";
import getProjectById from "@/lib/supabase/get-project-by-id";
import updateIssueStatus from "@/lib/supabase/update-issue-status";
import { IssueStatus } from "@/lib/types/issue-status.enum";
import { Project } from "@/lib/types/project.type";
import { issuesState } from "@/states/issues-state";
import { projectsState } from "@/states/projects-state";
import { isLoadingUserState, userState } from "@/states/user-state";
import CommonView from "@/views/common-view";
import {
  DndContext,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";

type Props = {
  projectId?: string;
};

export default function IssuesView({ projectId }: Props) {
  const user = useRecoilValue(userState);
  const projects = useRecoilValue(projectsState);
  const issues = useRecoilValue(issuesState);
  const setIssues = useSetRecoilState(issuesState);

  const isLoadingUser = useRecoilValue(isLoadingUserState);

  const [project, setProject] = useState<Project>();
  const [isLoadingProject, setIsLoadingProject] = useState<boolean>(true);
  const [isLoadingIssues, setIsLoadingIssues] = useState(true);

  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) {
        setIsLoadingProject(false);
        return;
      }
      if (isLoadingUser) return;
      try {
        setIsLoadingProject(true);

        const existingProject = projects.find(
          (project) => project.id === projectId,
        );
        if (existingProject) {
          setProject(existingProject);
        } else {
          if (user) {
            const project = await getProjectById(projectId);
            setProject(project);
          } else {
            const dummyProject = await getDummyProjectById(projectId);
            setProject(dummyProject);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingProject(false);
      }
    };
    fetchProject();
  }, [user, isLoadingUser, projectId, setIssues]);

  useEffect(() => {
    const fetchIssues = async () => {
      if (isLoadingUser || !user) return;
      try {
        setIsLoadingIssues(true);
        const issues = await getAllIssues(user.id);
        setIssues(issues);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingIssues(false);
      }
    };
    fetchIssues();
  }, [user, isLoadingUser, setIssues]);

  useEffect(() => {
    const fetchDummyIssues = async () => {
      if (isLoadingUser || user) return;
      try {
        if (issues.length === 0) {
          setIsLoadingIssues(true);
          const dummyIssues = await getDummyIssues();
          setIssues(dummyIssues);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingIssues(false);
      }
    };
    fetchDummyIssues();
  }, [user, isLoadingUser, issues, setIssues]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  return (
    <CommonView>
      {isLoadingProject || isLoadingIssues ? (
        <BreadcrumbsSkeleton />
      ) : (
        <Breadcrumbs
          isAllProjects={projectId === undefined}
          projectId={project ? project.id : undefined}
          projectTitle={project ? project.title : undefined}
          isAllIssues={true}
        />
      )}
      <div
        className="flex flex-1 gap-x-2"
        style={{
          overflowX: "scroll",
        }}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={pointerWithin}
          onDragStart={async (event) => {
            setActiveId(event.active.id.toString());
          }}
          onDragEnd={async (event) => {
            if (event.over === null) return;
            setActiveId(null);
            const targetIssueStatus = event.over.id;
            const droppedIssueId = event.active.id;

            const targetIssue = issues.find(
              (issue) => issue.id === droppedIssueId,
            );
            if (!targetIssue) return;

            if (targetIssueStatus === targetIssue.status) return;

            setIssues((oldIssues) =>
              oldIssues.map((issue) =>
                issue.id === droppedIssueId
                  ? {
                      ...issue,
                      status: targetIssueStatus as IssueStatus,
                    }
                  : issue,
              ),
            );

            // Save the status to the database if the user is signed in
            if (user) {
              await updateIssueStatus(
                droppedIssueId.toString(),
                targetIssueStatus as IssueStatus,
              );
            }

            toast.success("Status updated", {
              description: `${targetIssue.title} - ${targetIssueStatus}`,
              duration: 3000,
            });
          }}
        >
          {Object.values(IssueStatus).map((status) => (
            <StatusIssues
              key={status}
              projectId={projectId}
              status={status}
              isLoading={isLoadingProject || isLoadingIssues}
              activeId={activeId}
            />
          ))}
        </DndContext>
      </div>
    </CommonView>
  );
}
