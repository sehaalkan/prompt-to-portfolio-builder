type ErrorToastProps = {
  message: string
  onDismiss: () => void
}

export const ErrorToast = ({ message, onDismiss }: ErrorToastProps) => {
  if (!message) return null

  return (
    <div
      className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-md animate-stepEnter"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3 px-5 py-4 rounded-xl border border-red-300/60 bg-red-50/95 backdrop-blur-md shadow-lg">
        <svg
          className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-widest text-red-400 font-medium mb-1">
            Bağlantı Hatası
          </p>
          <p className="text-sm text-red-800 leading-relaxed">{message}</p>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss error"
          className="text-red-400 hover:text-red-600 transition-colors shrink-0 text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  )
}
