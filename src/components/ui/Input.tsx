import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export const Input = ({ label, id, className = '', ...props }: InputProps) => {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-3 py-2.5 rounded-lg bg-night-50 border border-night-100
          text-gray-100 placeholder:text-gray-600
          focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40
          transition-all duration-200 text-sm
          ${className}
        `}
        {...props}
      />
    </div>
  )
}
