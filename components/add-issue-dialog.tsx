"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IconPencilPlus } from "@tabler/icons-react";

import DatePicker from "@/components/date-picker";
import IssuePrioritySelect from "@/components/issue-priority-select";
import IssueProjectSelect from "@/components/issue-project-select";
import IssuePropertyItem from "@/components/issue-property-item";
import IssueStatusSelect from "@/components/issue-status-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import addIssue from "@/lib/supabase/add-issue";
import { IssuePriority } from "@/lib/types/issue-priority.enum";
import { IssueStatus } from "@/lib/types/issue-status.enum";
import { Issue } from "@/lib/types/issue.type";
import { issuesState } from "@/states/issues-state";
import { projectsState } from "@/states/projects-state";
import { userState } from "@/states/user-state";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RingLoader from "react-spinners/RingLoader";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";
import * as z from "zod";

type Props = {
  type: "icon" | "text";
  initialProjectId?: string;
  initialStatus?: IssueStatus;
};

const schema = z.object({
  title: z.string().min(1, { message: "Title is missing" }),
  description: z.string(),
  status: z.nativeEnum(IssueStatus),
  priority: z.nativeEnum(IssuePriority),
  planned_end_date: z.date().optional(),
  project_id: z.string(),
});

export default function AddIssueDialog({
  type,
  initialProjectId,
  initialStatus,
}: Props) {
  const user = useRecoilValue(userState);

  const setIssues = useSetRecoilState(issuesState);
  const projects = useRecoilValue(projectsState);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      status: initialStatus || IssueStatus.Backlog,
      priority: IssuePriority.NoPriority,
      planned_end_date: undefined,
      // project_id: projects.length > 0 ? projects[0].id : "",
      project_id: initialProjectId || "NoProject",
    },
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      setIsSubmitting(true);

      let newIssue: Issue;
      if (user) {
        newIssue = await addIssue(
          user.id,
          values.title,
          values.description,
          values.status,
          values.priority || null,
          values.planned_end_date || null,
          values.project_id === "NoProject" ? null : values.project_id,
        );
      } else {
        newIssue = {
          id: new Date().getMilliseconds().toString(),
          title: values.title,
          description: values.description,
          status: values.status,
          priority: values.priority,
          planned_start_date: null,
          planned_end_date: values.planned_end_date || null,
          actual_start_date: null,
          actual_end_date: null,
          parent_issue_id: null,
          created_at: new Date(),
          project_id:
            values.project_id === "NoProject" ? null : values.project_id,
        };
      }

      if (!initialProjectId || values.project_id === initialProjectId)
        setIssues((oldIssues) => [...oldIssues, newIssue]);
      setIsOpen(false);
      form.reset();

      toast.success("Issue created", {
        description: newIssue.title,
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "Failed to add the issue. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    form.setValue("project_id", initialProjectId || "NoProject");
  }, [initialProjectId]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {type === "icon" ? (
          <Button variant="ghost" className="size-8 rounded-lg p-0 shadow-md">
            <IconPencilPlus />
          </Button>
        ) : (
          <Button variant="outline" className="h-8 text-xs">
            Add issue
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Add New Issue</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-stretch gap-y-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <FormItem>
                  {/* <FormLabel>Issue Title</FormLabel> */}
                  <FormControl>
                    <Input
                      autoFocus
                      placeholder="Issue title"
                      className={`border-none text-xl font-medium focus-visible:ring-0 focus-visible:ring-transparent ${fieldState.invalid ? "border-destructive" : ""}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Add description here"
                      className={`border-none focus-visible:ring-0 focus-visible:ring-transparent ${fieldState.invalid ? "border-destructive" : ""}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between gap-x-2">
              <IssuePropertyItem label="Project">
                <IssueProjectSelect
                  value={form.watch("project_id")}
                  onValueChange={(value) => form.setValue("project_id", value)}
                />
              </IssuePropertyItem>

              <IssuePropertyItem label="Status">
                <IssueStatusSelect
                  value={form.watch("status")}
                  onValueChange={(value) =>
                    form.setValue("status", value as IssueStatus)
                  }
                />
              </IssuePropertyItem>

              <IssuePropertyItem label="Priority">
                <IssuePrioritySelect
                  value={form.watch("priority")}
                  onValueChange={(value) => {
                    form.setValue("priority", value as IssuePriority);
                  }}
                />
              </IssuePropertyItem>

              <IssuePropertyItem label="Due date">
                <DatePicker
                  value={form.watch("planned_end_date")}
                  onValueChange={(value) =>
                    form.setValue("planned_end_date", value)
                  }
                />
              </IssuePropertyItem>
            </div>

            <Button
              className="h-8 w-16 self-end"
              type="submit"
              disabled={!form.formState.isValid || isSubmitting}
            >
              {isSubmitting ? (
                <RingLoader size={16} color="white" />
              ) : (
                <span>Add</span>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
