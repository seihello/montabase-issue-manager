"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IconPencilPlus } from "@tabler/icons-react";

import { useToast } from "@/components/hooks/use-toast";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title is missing" }),
  description: z.string(),
});

export default function AddIssueDialog() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      const newIssue = await addIssue(
        values.title,
        values.description,
        IssueStatus.Backlog,
        null,
      );
      console.log("New issue", newIssue);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="size-8 rounded-lg p-0 shadow-md">
          <IconPencilPlus />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <div className="h-4 w-4"></div>
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
            <Button
              className="h-8 self-end"
              type="submit"
              disabled={!form.formState.isValid}
            >
              Add
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
