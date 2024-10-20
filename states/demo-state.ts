import { atom } from "recoil";

export const isDemoMessageHiddenState = atom<boolean>({
  key: "is_demo_message_hidden",
  default: false,
});
