import type { TextareaHTMLAttributes } from 'react'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
}

export const Textarea = ({ label, id, className = '', ...props }: TextareaProps) => {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={textareaId} className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`
          w-full px-3 py-2.5 rounded-lg bg-night-50 border border-night-100
          text-gray-100 placeholder:text-gray-600
          focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40
          transition-all duration-200 text-sm resize-none
          ${className}
        `}
        {...props}
      />
    </div>
  )
}
