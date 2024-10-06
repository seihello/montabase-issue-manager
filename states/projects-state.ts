import { Project } from "@/lib/types/project.type";
import { atom } from "recoil";

export const projectsState = atom<Project[]>({ key: "projects", default: [] });
