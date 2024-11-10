import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center gap-y-8 text-lg">
      <p>{`I'm sorry. This page does not exist.`}</p>
      <img src="/img/illustrations/explore.svg" className="h-auto w-96" />
      <a href="/project/all">
        <Button variant="outline">See all issues</Button>
      </a>
    </div>
  );
}
