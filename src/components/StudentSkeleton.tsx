import { Skeleton } from "./ui/skeleton";

export function StudentSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-4">
      <div className="w-full space-y-3">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-3 w-1/6" />
        <Skeleton className="h-3 w-1/5" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-8 w-20" />
    </div>
  );
}
