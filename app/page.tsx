"use client";
import Breadcrumbs from "@/components/breadcrumbs";
import getAllIssues from "@/lib/supabase/get-all-issues";
import { issuesState } from "@/states/issues-state";
import { userState } from "@/states/user-state";
import IssuesView from "@/views/issues-view";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function TopPage() {
  const setIssues = useSetRecoilState(issuesState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    const fetchIssues = async () => {
      if (!user) return;
      const issues = await getAllIssues(user.id);
      setIssues(issues);
    };
    fetchIssues();
  }, [user, setIssues]);

  return (
    <>
      <Breadcrumbs isAllProjects={true} isAllIssues={true} />
      <IssuesView />
    </>
  );
}
