type LoadingSkeletonProps = {
  message?: string
  progress?: { completed: number; total: number }
}

export const LoadingSkeleton = ({
  message = 'AI is analyzing your images...',
  progress,
}: LoadingSkeletonProps) => {
  const progressPercent = progress
    ? Math.round((progress.completed / progress.total) * 100)
    : 0

  return (
    <div
      className="flex flex-col items-center py-12 text-center"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400">
        {message}
      </p>

      <div className="relative mx-auto h-[1px] w-48 overflow-hidden bg-neutral-200 dark:bg-neutral-700">
        <div
          className="absolute inset-y-0 left-0 bg-red-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
          aria-hidden="true"
        />
      </div>

      {progress && (
        <p className="mt-2 font-mono text-[10px] tracking-widest text-neutral-400 dark:text-neutral-500">
          {progress.completed} / {progress.total} · {progressPercent}%
        </p>
      )}
    </div>
  )
}
