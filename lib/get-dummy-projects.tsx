import { Project } from "@/lib/types/project.type";
import { v4 as uuidv4 } from "uuid";

export default function getDummyProjects() {
  const projects: Project[] = [
    createProject("Marketing Campaign"),
    createProject("Product Development"),
    createProject("Financial Analysis"),
  ];
  return projects;
}

function createProject(title: string) {
  const project: Project = {
    id: uuidv4(),
    title,
  };
  return project;
}
