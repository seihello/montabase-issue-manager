import { Skeleton } from "@/components/ui/skeleton";

export default function IssueSkeletons() {
  return (
    <div className="flex flex-col items-start gap-y-4 p-16">
      <Skeleton className="h-8 w-192" />
      <Skeleton className="h-24 w-192" />
      <div className="flex gap-x-2">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-10 w-56" />
      </div>
    </div>
  );
}
