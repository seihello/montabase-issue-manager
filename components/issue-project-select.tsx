import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { projectsState } from "@/states/projects-state";
import { useRecoilValue } from "recoil";

type Props = {
  value: string;
  onValueChange: (value: string) => void;
};

export default function IssueProjectSelect({ value, onValueChange }: Props) {
  const projects = useRecoilValue(projectsState);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={`w-full truncate py-1 focus:ring-1 focus:ring-offset-0 ${value ? "" : "text-muted-foreground"}`}
      >
        <span className="w-[196px] truncate text-left">
          {value === "NoProject"
            ? "---"
            : projects.find((project) => project.id === value)?.title}
        </span>
      </SelectTrigger>
      <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <SelectItem
          value="NoProject"
          className="flex w-auto max-w-[300px] truncate"
        >
          ---
        </SelectItem>
        {projects.map((project) => (
          <SelectItem
            key={project.id}
            value={project.id}
            className="flex w-auto max-w-[300px] truncate"
          >
            {project.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
