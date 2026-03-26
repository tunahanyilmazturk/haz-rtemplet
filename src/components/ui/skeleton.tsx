import { cn } from "@/lib/utils";

function Skeleton({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "default" | "circular" | "text" | "rounded";
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse bg-muted/50",
        variant === "circular" && "rounded-full",
        variant === "text" && "rounded-md h-4",
        variant === "rounded" && "rounded-lg",
        variant === "default" && "rounded-xl",
        className
      )}
      {...props}
    />
  );
}

function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border bg-card p-5", className)}>
      <Skeleton className="h-4 w-24 mb-3" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-4 w-20 mt-2" />
    </div>
  );
}

function AvatarSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton
      variant="circular"
      className={cn("h-10 w-10", className)}
    />
  );
}

function InputSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton
      variant="rounded"
      className={cn("h-10 w-full", className)}
    />
  );
}

function ButtonSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton
      variant="rounded"
      className={cn("h-10 w-24", className)}
    />
  );
}

function ChartSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-48" />
      </div>
      <Skeleton className="h-[250px] w-full" />
    </div>
  );
}

function ListSkeleton({
  items = 5,
  className,
}: {
  items?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <AvatarSkeleton />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      ))}
    </div>
  );
}

export { Skeleton, CardSkeleton, AvatarSkeleton, InputSkeleton, ButtonSkeleton, ChartSkeleton, ListSkeleton };
