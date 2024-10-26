import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import updateProjectTitle from "@/lib/supabase/update-project-title";
import { projectsState } from "@/states/projects-state";
import { userState } from "@/states/user-state";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";

import * as z from "zod";

type Props = {
  projectId: string;
  projectTitle: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const schema = z.object({
  title: z.string().min(1, { message: "Title is missing" }),
});

export default function RenameProjectDialog({
  projectId,
  projectTitle,
  isOpen,
  setIsOpen,
}: Props) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: projectTitle,
    },
  });

  const user = useRecoilValue(userState);

  const setProjects = useSetRecoilState(projectsState);

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      if (user) await updateProjectTitle(projectId, values.title);

      setProjects((oldProjects) =>
        oldProjects.map((oldProject) =>
          oldProject.id === projectId
            ? { ...oldProject, title: values.title }
            : oldProject,
        ),
      );

      setIsOpen(false);
      form.reset();

      toast.success("Project renamed", {
        description: values.title,
        duration: 3000,
      });
    } catch (error) {
      toast.error("Error", {
        description: "Failed to rename the project. Please try again.",
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-144" onClick={(e) => e.stopPropagation()}>
        <DialogTitle>Rename project</DialogTitle>
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
                      onClick={(e) => e.stopPropagation()}
                      onBlur={(e) => e.stopPropagation()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="h-8 self-end"
              type="submit"
              // TODO: Disable the button while the new title is being submitted
              disabled={!form.formState.isValid}
            >
              Rename
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
