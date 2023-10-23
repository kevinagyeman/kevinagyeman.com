import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = () => {
  return (
    <>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-8 w-[150px]" />
        </div>
      </div>
      <div className="my-4 space-y-2">
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
      </div>
      <div className="my-8 space-y-2">
        <Skeleton className="h-8" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-8 w-2/4" />
        <Skeleton className="h-8" />
      </div>
    </>
  );
};

export default SkeletonLoader;
