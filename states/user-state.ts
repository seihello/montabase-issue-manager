import { User } from "@/lib/types/user.type";
import { atom } from "recoil";

export const userState = atom<User | null>({ key: "user", default: null });
export const isLoadingUserState = atom<boolean>({
  key: "is_loading_user",
  default: true,
});
