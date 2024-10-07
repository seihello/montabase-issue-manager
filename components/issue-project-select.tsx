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
    <Select value={value} onValueChange={onValueChange} open={true}>
      <SelectTrigger
        className={`w-[168px] truncate py-1 focus:ring-1 focus:ring-offset-0 ${value ? "" : "text-muted-foreground"}`}
      >
        <span className="w-[120px] truncate text-left">
          {projects.find((project) => project.id === value)?.title}
        </span>
      </SelectTrigger>
      <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
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
