import { Issue } from "@/lib/types/issue.type";
import { atom } from "recoil";

export const issueState = atom<Issue | null>({ key: "issue", default: null });
