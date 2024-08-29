import React from "react";
import { Skeleton } from "../ui/skeleton";

function SideNavSkeleton() {
  return (
    <div className="flex flex-col gap-4 m-2">
      <Skeleton className="h-32 w-full">
        <Skeleton className="h-12 w-12 rounded-full bg-black-1" />
      </Skeleton>
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}

export default SideNavSkeleton;
