"use client";
import AddIssueDialog from "@/components/add-issue-dialog";
import GoogleSignInButton from "@/components/google-sign-in-button";
import SidebarItem from "@/components/sidebar-item";
import SidebarProjects from "@/components/sidebar-projects";
import SidebarResizeHandle from "@/components/sidebar-resize-handle";
import SignOutButton from "@/components/sign-out-button";
import { projectsState } from "@/states/projects-state";
import {
  INITIAL_WIDTH,
  isSidebarResizingState,
  sidebarWidthState,
} from "@/states/ui-state";

import { isLoadingUserState, userState } from "@/states/user-state";
import {
  IconChevronLeft,
  IconChevronRight,
  IconList,
} from "@tabler/icons-react";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Sidebar() {
  const router = useRouter();

  const params = useParams<{ projectId: string }>();
  const pathname = usePathname();

  const user = useRecoilValue(userState);
  const isLoadingUser = useRecoilValue(isLoadingUserState);
  const projects = useRecoilValue(projectsState);

  const selectedProjectId = params.projectId ? params.projectId : undefined;

  const width = useRecoilValue(sidebarWidthState);
  const setWidth = useSetRecoilState(sidebarWidthState);

  const isResizing = useRecoilValue(isSidebarResizingState);

  return (
    <aside className="relative z-50 !select-none">
      <div
        className={`h-screen ${isResizing ? "" : "transition-[width]"}`}
        style={{
          width: width,
        }}
      />

      <div
        className="absolute bottom-0 left-full flex h-8 w-6 -translate-y-1/2 cursor-pointer items-center rounded-e-md border-b border-r border-t border-gray-300"
        onClick={() => setWidth(width === 0 ? INITIAL_WIDTH : 0)}
      >
        {width === 0 ? (
          <IconChevronRight className="bg-white text-gray-500" />
        ) : (
          <IconChevronLeft className="bg-white text-gray-500" />
        )}
      </div>

      <nav
        className={`fixed left-0 top-0 h-screen overflow-hidden border-r bg-white ${isResizing ? "" : "transition-[width]"}`}
        style={{
          width: width,
        }}
      >
        <div className="flex h-full w-full flex-col p-2 pb-3">
          <SidebarResizeHandle width={width} setWidth={setWidth} />
          <div className="flex flex-1 flex-col gap-y-8">
            <div className="flex items-center justify-between">
              {width >= INITIAL_WIDTH && (
                <Image
                  src="/img/montabase.png"
                  alt="logo"
                  fill
                  className="!relative !h-6 !w-auto object-contain"
                />
              )}
              {projects.length > 0 && (
                <AddIssueDialog
                  type="icon"
                  initialProjectId={selectedProjectId}
                />
              )}
            </div>
            <div className="flex flex-col">
              <SidebarItem
                label="All issues"
                icon={<IconList size={16} />}
                link="/project/all"
                pathname={pathname}
              />
              <SidebarProjects selectedProjectId={selectedProjectId} />
            </div>
          </div>
          <div className="flex flex-col items-center gap-y-1">
            {user && (
              <>
                {user.avatar_url ? (
                  <Image
                    src={user.avatar_url}
                    alt="profile_avatar"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                ) : (
                  <div></div>
                )}
                <span className="w-full truncate text-center">{user.name}</span>
              </>
            )}
            {isLoadingUser ? null : user ? (
              <SignOutButton />
            ) : (
              <div className="relative">
                <GoogleSignInButton sidebarWidth={width} />
              </div>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
}
