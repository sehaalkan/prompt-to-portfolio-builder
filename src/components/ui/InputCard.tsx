import type { TextareaHTMLAttributes, ReactNode } from 'react'

type InputCardProps = {
  label?: string
  children: ReactNode
  className?: string
}

export const InputCard = ({ label, children, className = '' }: InputCardProps) => {
  return (
    <div className={`input-card flex flex-col ${className}`}>
      {label && <p className="minimal-label">{label}</p>}
      {children}
    </div>
  )
}

type MinimalTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
}

export const MinimalTextarea = ({ label, className = '', ...props }: MinimalTextareaProps) => {
  return (
    <InputCard label={label} className={className}>
      <textarea className="minimal-input resize-none !text-sm !py-2" {...props} />
    </InputCard>
  )
}
