"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IconPlus } from "@tabler/icons-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import addProject from "@/lib/supabase/add-project";
import { Project } from "@/lib/types/project.type";
import { projectsState } from "@/states/projects-state";
import { userState } from "@/states/user-state";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import RingLoader from "react-spinners/RingLoader";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title is missing" }),
});

export default function AddProjectDialog() {
  const user = useRecoilValue(userState);
  const setProjects = useSetRecoilState(projectsState);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
    },
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      setIsSubmitting(true);

      const newProject: Project = user
        ? await addProject(user.id, values.title)
        : { id: uuidv4(), title: values.title };
      setProjects((oldProjects) => [...oldProjects, newProject]);

      setIsOpen(false);
      form.reset();

      toast.success("Project created", {
        description: newProject.title,
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="absolute -top-[2px] right-0 h-auto w-auto p-1"
        >
          <IconPlus size={12} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Add New Project</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-stretch gap-y-4"
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
                      placeholder="Project title"
                      className={`${fieldState.invalid ? "border-destructive" : ""}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
