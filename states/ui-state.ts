import { atom } from "recoil";

export const INITIAL_WIDTH = 216;
export const MIN_WIDTH = 128;
export const MAX_WIDTH = 400;

export const sidebarWidthState = atom<number>({
  key: "sidebarWidth",
  default: INITIAL_WIDTH,
});
