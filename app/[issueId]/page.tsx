"use client";
import Breadcrumbs from "@/components/breadcrumbs";
import BreadcrumbsSkeleton from "@/components/breadcrumbs-skeleton";
import DatePicker from "@/components/date-picker";
import DeleteIssueDialog from "@/components/delete-issue-dialog";
import IssuePrioritySelect from "@/components/issue-priority-select";
import IssueProjectSelect from "@/components/issue-project-select";
import IssuePropertyItem from "@/components/issue-property-item";
import IssueSkeletons from "@/components/issue-skeletons";
import IssueStatusSelect from "@/components/issue-status-select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useUpdateIssue from "@/hooks/use-update-issue";
import getIssueById from "@/lib/supabase/get-issue-by-id";
import { IssuePriority } from "@/lib/types/issue-priority.enum";
import { IssueStatus } from "@/lib/types/issue-status.enum";
import { issueState } from "@/states/issue-state";
import { projectsState } from "@/states/projects-state";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function CourseSlugPage({
  params,
}: {
  params: { issueId: string };
}) {
  const projects = useRecoilValue(projectsState);
  const issue = useRecoilValue(issueState);
  const setIssue = useSetRecoilState(issueState);

  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const [isLoadingIssue, setIsLoadingIssue] = useState(true);

  const {
    setIssueTitle,
    setIssueDescription,
    setIssueProject,
    setIssueStatus,
    setIssuePriority,
    setIssuePlannedEndDate,
  } = useUpdateIssue(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        setIsLoadingIssue(true);
        const issue = await getIssueById(params.issueId);
        setEditingTitle(issue.title);
        setEditingDescription(issue.description || "");
        setIssue(issue);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingIssue(false);
      }
    };
    fetchIssue();
  }, [params.issueId, setIssue]);

  // const saveIssue = useCallback(async (issue: Issue) => {
  //   try {
  //     await updateIssue(issue);

  //     toast.success("Issue updated", {
  //       description: issue.title,
  //       duration: 3000,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  useEffect(() => {
    if (!issue || issue.title === editingTitle) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIssueTitle(issue.id, editingTitle);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line
  }, [editingTitle, timerRef]);

  useEffect(() => {
    if (!issue || issue.description === editingDescription) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIssueDescription(issue.id, issue.title, editingDescription);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line
  }, [editingDescription, timerRef]);

  return (
    <>
      {!isLoadingIssue && issue ? (
        <Breadcrumbs
          isAllProjects={issue.project_id === null}
          projectId={issue.project_id || undefined}
          projectTitle={
            projects.find((project) => project.id === issue.project_id)?.title
          }
          isAllIssues={false}
          issueId={issue.id}
          issueTitle={issue.title}
        />
      ) : (
        <BreadcrumbsSkeleton />
      )}
      {!isLoadingIssue && issue ? (
        <div className="flex flex-col items-start gap-y-4 p-16">
          <Input
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
            placeholder="Issue title"
            className={`border-none p-0 text-2xl font-semibold focus-visible:ring-0 focus-visible:ring-transparent`}
          />
          <Textarea
            value={editingDescription}
            onChange={(e) => setEditingDescription(e.target.value)}
            placeholder="Add description here"
            className={`border-none p-0 text-base focus-visible:ring-0 focus-visible:ring-transparent`}
          />
          <div className="flex gap-x-2">
            <IssuePropertyItem label="Project">
              <IssueProjectSelect
                value={issue.project_id || "NoProject"}
                onValueChange={(value) => {
                  setIssueProject(
                    issue.id,
                    issue.title,
                    value === "NoProject" ? null : value,
                  );
                }}
              />
            </IssuePropertyItem>

            <IssuePropertyItem label="Status">
              <IssueStatusSelect
                value={issue.status}
                onValueChange={(value) => {
                  setIssueStatus(issue.id, issue.title, value as IssueStatus);
                }}
              />
            </IssuePropertyItem>

            <IssuePropertyItem label="Priority">
              <IssuePrioritySelect
                value={issue.priority || undefined}
                onValueChange={(value) => {
                  setIssuePriority(
                    issue.id,
                    issue.title,
                    value as IssuePriority,
                  );
                }}
              />
            </IssuePropertyItem>

            <IssuePropertyItem label="Due date">
              <DatePicker
                value={issue.planned_end_date || undefined}
                onValueChange={(value) => {
                  setIssuePlannedEndDate(issue.id, issue.title, value || null);
                }}
              />
            </IssuePropertyItem>
          </div>

          <DeleteIssueDialog issueId={issue.id} issueTitle={issue.title} />
        </div>
      ) : (
        <IssueSkeletons />
      )}
    </>
  );
}
