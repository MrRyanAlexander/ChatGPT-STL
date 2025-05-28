
import { memo } from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Skeleton = memo(({
  className,
  ...props
}: SkeletonProps) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
});

Skeleton.displayName = "Skeleton";

export { Skeleton };
