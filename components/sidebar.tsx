"use client";
import AddIssueDialog from "@/components/add-issue-dialog";
import GoogleSignInButton from "@/components/google-sign-in-button";
import SidebarItem from "@/components/sidebar-item";
import SidebarProjects from "@/components/sidebar-projects";
import SidebarResizeHandle from "@/components/sidebar-resize-handle";
import SignOutButton from "@/components/sign-out-button";
import { projectsState } from "@/states/projects-state";

import { isLoadingUserState, userState } from "@/states/user-state";
import { IconList } from "@tabler/icons-react";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilValue } from "recoil";

export default function Sidebar() {
  const router = useRouter();

  const params = useParams<{ projectId: string }>();
  const pathname = usePathname();

  const user = useRecoilValue(userState);
  const isLoadingUser = useRecoilValue(isLoadingUserState);
  const projects = useRecoilValue(projectsState);

  const selectedProjectId = params.projectId ? params.projectId : undefined;

  const [width, setWidth] = useState(208);

  return (
    <aside className="z-50">
      <div
        className="h-screen"
        style={{
          width: width,
        }}
      />
      <nav
        className="fixed left-0 top-0 flex h-screen flex-col items-stretch border-r bg-white p-2 pb-3"
        style={{
          width: width,
        }}
      >
        <SidebarResizeHandle width={width} setWidth={setWidth} />
        <div className="flex flex-1 flex-col gap-y-8">
          <div className="flex items-center justify-between gap-x-8">
            <div
              className="relative flex h-full flex-1 cursor-pointer items-center"
              onClick={() => router.push("/project/all")}
            >
              <Image
                src="/img/montabase.svg"
                alt="profile_avatar"
                fill
                className="object-contain"
              />
            </div>
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
              <span className="truncate">{user.name}</span>
            </>
          )}
          {isLoadingUser ? null : user ? (
            <SignOutButton />
          ) : (
            <div className="relative">
              <GoogleSignInButton />
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
