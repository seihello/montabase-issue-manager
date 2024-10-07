import { IssuePriority } from "./issue-priority.enum";
import { IssueStatus } from "./issue-status.enum";

export type Issue = {
  id: string;
  title: string;
  description: string | null;
  status: IssueStatus;
  priority: IssuePriority;
  planned_start_date: Date | null;
  planned_end_date: Date | null;
  actual_start_date: Date | null;
  actual_end_date: Date | null;
  parent_issue_id: string | null;
  project_id: string | null;
  created_at: Date;
};
