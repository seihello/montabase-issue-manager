"use client";
import AddIssueDialog from "@/components/add-issue-dialog";
import GoogleSignInButton from "@/components/google-sign-in-button";
import SidebarItem from "@/components/sidebar-item";
import SidebarProjects from "@/components/sidebar-projects";
import SidebarResizeHandle from "@/components/sidebar-resize-handle";
import SignOutButton from "@/components/sign-out-button";
import { projectsState } from "@/states/projects-state";

import { isLoadingUserState, userState } from "@/states/user-state";
import { IconChevronRight, IconList } from "@tabler/icons-react";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilValue } from "recoil";

const INITIAL_WIDTH = 216;
export const MIN_WIDTH = 128;
export const MAX_WIDTH = 400;

export default function Sidebar() {
  const router = useRouter();

  const params = useParams<{ projectId: string }>();
  const pathname = usePathname();

  const user = useRecoilValue(userState);
  const isLoadingUser = useRecoilValue(isLoadingUserState);
  const projects = useRecoilValue(projectsState);

  const selectedProjectId = params.projectId ? params.projectId : undefined;

  const [width, setWidth] = useState(INITIAL_WIDTH);

  return (
    <aside className="relative z-50 !select-none">
      <div
        className="h-screen"
        style={{
          width: width,
        }}
      />
      {width === 0 && (
        <div
          className="absolute bottom-0 left-full flex h-8 w-6 -translate-y-1/2 cursor-pointer items-center rounded-e-md border-b border-r border-t border-gray-300"
          onClick={() => setWidth(INITIAL_WIDTH)}
        >
          <IconChevronRight className="text-gray-500" />
        </div>
      )}
      <nav
        className="fixed left-0 top-0 h-screen overflow-hidden border-r bg-white"
        style={{
          width: width,
        }}
      >
        <div className="flex h-full w-full flex-col p-2 pb-3">
          <SidebarResizeHandle width={width} setWidth={setWidth} />
          <div className="flex flex-1 flex-col gap-y-8">
            <div className="flex items-center justify-between">
              {width > 176 && (
                <Image
                  src="/img/montabase.svg"
                  alt="logo"
                  fill
                  className="!relative !h-5 !w-auto object-contain"
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
