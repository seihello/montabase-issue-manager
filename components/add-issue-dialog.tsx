"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IconPencilPlus } from "@tabler/icons-react";

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
import { IssueStatus } from "@/lib/types/issue-status.enum";
import { Issue } from "@/lib/types/issue.type";
import { issuesState } from "@/states/issues-state";
import { userState } from "@/states/user.state";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import RingLoader from "react-spinners/RingLoader";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";
import * as z from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title is missing" }),
  description: z.string(),
  status: z.nativeEnum(IssueStatus),
});

export default function AddIssueDialog() {
  const user = useRecoilValue(userState);

  const setIssues = useSetRecoilState(issuesState);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      status: IssueStatus.Backlog,
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
          null,
        );
      } else {
        newIssue = {
          id: new Date().getMilliseconds().toString(),
          title: values.title,
          description: values.description,
          status: values.status,
          priority: null,
          planned_start_date: null,
          planned_end_date: null,
          actual_start_date: null,
          actual_end_date: null,
          parent_issue_id: null,
          created_at: new Date(),
        };
      }

      setIssues((oldIssues) => [...oldIssues, newIssue]);
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "Failed to add the issue. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="size-8 rounded-lg p-0 shadow-md">
          <IconPencilPlus />
        </Button>
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

            <div className="flex gap-x-2">
              <IssueStatusSelect
                value={form.watch("status")}
                onValueChange={(value) =>
                  form.setValue("status", value as IssueStatus)
                }
              />
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
