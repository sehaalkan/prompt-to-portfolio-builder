import { useState, useRef, useCallback, type DragEvent, type KeyboardEvent } from 'react'

type DropZoneProps = {
  onFilesSelected: (files: File[]) => void
  accept?: string
  disabled?: boolean
}

export const DropZone = ({
  onFilesSelected,
  accept = 'image/*',
  disabled = false,
}: DropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || disabled) return
      const files = Array.from(fileList)
      if (files.length > 0) onFilesSelected(files)
    },
    [onFilesSelected, disabled]
  )

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!disabled) setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleClick = () => {
    if (!disabled) inputRef.current?.click()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="Upload images by clicking or dragging files here"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative flex flex-col items-center justify-center gap-3 p-8
        rounded-xl border-2 border-dashed cursor-pointer
        transition-all duration-200
        ${isDragging
          ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
          : 'border-night-100 bg-night-50/30 hover:border-indigo-500/50 hover:bg-night-50/60'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        disabled={disabled}
        aria-hidden="true"
      />

      <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
        <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-300 font-medium">
          {isDragging ? 'Drop images here' : 'Drag & drop images here'}
        </p>
        <p className="text-xs text-gray-500 mt-1">or click to browse · PNG, JPG, WebP</p>
      </div>
    </div>
  )
}
