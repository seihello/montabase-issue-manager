import { Issue } from "@/lib/types/issue.type";
import { atom } from "recoil";

export const issuesState = atom<Issue[]>({ key: "issues", default: [] });
