import type { InputHTMLAttributes } from 'react'

type MinimalInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  variant?: 'default' | 'camera-body'
  prefix?: '@' | '/'
  plainRow?: boolean
}

const editorialInputClass =
  'w-full border-0 bg-transparent py-2 text-sm font-light text-neutral-800 outline-none placeholder:text-neutral-300 placeholder:font-light dark:text-neutral-200 dark:placeholder:text-neutral-500/50'

const editorialRowClass =
  'mt-2 flex items-center border-b border-neutral-200/60 pb-1 dark:border-neutral-700/60'

export const MinimalInput = ({
  label,
  id,
  className = '',
  variant = 'default',
  prefix,
  plainRow = false,
  ...props
}: MinimalInputProps) => {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  const cardClass = variant === 'camera-body' ? 'camera-body-input' : 'input-card'
  const useEditorialRow = Boolean(prefix) || plainRow

  return (
    <div className={`${cardClass} flex flex-col ${className}`}>
      {label && (
        <label htmlFor={inputId} className="minimal-label">
          {label}
        </label>
      )}
      {useEditorialRow ? (
        <div className={editorialRowClass}>
          {prefix && (
            <span
              className="mr-1 select-none font-mono text-sm font-light text-neutral-400 dark:text-neutral-500"
              aria-hidden="true"
            >
              {prefix}
            </span>
          )}
          <input
            id={inputId}
            className={editorialInputClass}
            {...props}
          />
        </div>
      ) : (
        <input
          id={inputId}
          className="minimal-input"
          {...props}
        />
      )}
    </div>
  )
}
