"use client";
import Breadcrumbs from "@/components/breadcrumbs";
import getDummyIssues from "@/lib/supabase/demo/get-dummy-issues";
import getAllIssues from "@/lib/supabase/get-all-issues";
import { issuesState } from "@/states/issues-state";
import { isLoadingUserState, userState } from "@/states/user-state";
import CommonView from "@/views/common-view";
import IssuesView from "@/views/issues-view";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function AllProjectsPage() {
  const setIssues = useSetRecoilState(issuesState);
  const user = useRecoilValue(userState);
  const isLoadingUser = useRecoilValue(isLoadingUserState);

  const [isLoadingIssues, setIsLoadingIssues] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      if (isLoadingUser) return;
      try {
        setIsLoadingIssues(true);

        if (user) {
          const issues = await getAllIssues(user.id);
          setIssues(issues);
        } else {
          const dummyIssues = await getDummyIssues();
          setIssues(dummyIssues);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingIssues(false);
      }
    };
    fetchIssues();
  }, [user, isLoadingUser, setIssues]);

  return (
    <CommonView>
      <Breadcrumbs isAllProjects={true} isAllIssues={true} />
      <IssuesView isLoading={isLoadingIssues} />
    </CommonView>
  );
}
