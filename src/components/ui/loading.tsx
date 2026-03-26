import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div>
        <Skeleton className="h-9 w-56 bg-muted/50" />
        <Skeleton className="h-5 w-80 mt-2 bg-muted/50" />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24 bg-muted/50" />
              <Skeleton className="h-10 w-10 rounded-xl bg-muted/50" />
            </div>
            <Skeleton className="h-8 w-32 mt-3 bg-muted/50" />
            <Skeleton className="h-4 w-20 mt-2 bg-muted/50" />
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="grid gap-6 lg:grid-cols-7">
        <div className="rounded-xl border bg-card lg:col-span-4 p-5">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-6 w-32 bg-muted/50" />
            <Skeleton className="h-8 w-40 bg-muted/50" />
          </div>
          <Skeleton className="h-[280px] w-full bg-muted/50" />
        </div>

        {/* Top Products */}
        <div className="rounded-xl border bg-card lg:col-span-3 p-5">
          <Skeleton className="h-6 w-36 bg-muted/50 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-lg bg-muted/50" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-28 bg-muted/50" />
                  <Skeleton className="h-3 w-40 bg-muted/50" />
                </div>
              </div>
            ))}
          </div>
          <Skeleton className="h-[100px] w-full mt-4 bg-muted/50" />
        </div>
      </div>

      {/* Sales & Transactions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-28 bg-muted/50" />
              <Skeleton className="h-8 w-16 bg-muted/50" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-full bg-muted/50" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32 bg-muted/50" />
                    <Skeleton className="h-3 w-48 bg-muted/50" />
                  </div>
                  <Skeleton className="h-5 w-20 bg-muted/50" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-xl bg-muted/50" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 bg-muted/50" />
                <Skeleton className="h-7 w-20 bg-muted/50" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SettingsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <Skeleton className="h-9 w-32 bg-muted/50" />
        <Skeleton className="h-5 w-72 mt-2 bg-muted/50" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-10 w-[200px] bg-muted/50" />
      </div>

      <div className="rounded-xl border bg-card p-5">
        <Skeleton className="h-6 w-28 bg-muted/50 mb-4" />
        <div className="space-y-4">
          <div className="flex items-center gap-6">
            <Skeleton className="h-20 w-20 rounded-full bg-muted/50" />
            <div className="space-y-2">
              <Skeleton className="h-10 w-32 bg-muted/50" />
              <Skeleton className="h-4 w-48 bg-muted/50" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-12 bg-muted/50" />
              <Skeleton className="h-10 w-full bg-muted/50" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16 bg-muted/50" />
              <Skeleton className="h-10 w-full bg-muted/50" />
            </div>
          </div>
          <Skeleton className="h-10 w-32 bg-muted/50" />
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-64 bg-muted/50" />
        <Skeleton className="h-10 w-32 bg-muted/50" />
      </div>
      <div className="rounded-xl border bg-card">
        <div className="border-b p-4">
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 flex-1 bg-muted/50" />
            ))}
          </div>
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="border-b p-4 last:border-0">
            <div className="flex gap-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <Skeleton key={j} className="h-4 flex-1 bg-muted/50" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReportsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <Skeleton className="h-9 w-32 bg-muted/50" />
        <Skeleton className="h-5 w-64 mt-2 bg-muted/50" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-5">
            <Skeleton className="h-4 w-20 bg-muted/50" />
            <Skeleton className="h-8 w-28 mt-2 bg-muted/50" />
            <Skeleton className="h-4 w-16 mt-2 bg-muted/50" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-5">
            <Skeleton className="h-6 w-36 bg-muted/50 mb-4" />
            <Skeleton className="h-[250px] w-full bg-muted/50" />
          </div>
        ))}
      </div>
    </div>
  );
}
