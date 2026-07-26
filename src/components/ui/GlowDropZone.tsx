import { useState, useRef, useCallback, type DragEvent, type KeyboardEvent } from 'react'

type GlowDropZoneProps = {
  onFilesSelected: (files: File[]) => void
  disabled?: boolean
}

export const GlowDropZone = ({ onFilesSelected, disabled = false }: GlowDropZoneProps) => {
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
        glow-dropzone flex flex-col items-center justify-center
        min-h-[320px] md:min-h-[400px] cursor-pointer
        ${isDragging ? 'glow-dropzone-active' : ''}
        ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        disabled={disabled}
        aria-hidden="true"
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gallery-champagne/30 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 p-12">
        <div className="w-16 h-16 rounded-full border border-gallery-line flex items-center justify-center bg-white/40">
          <svg className="w-7 h-7 text-gallery-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
          </svg>
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-gallery-anthracite">
            {isDragging ? 'Release to upload' : 'Drop your work here'}
          </p>
          <p className="text-xs text-gallery-muted font-light">
            PNG · JPG · WebP — multiple files supported
          </p>
        </div>
      </div>
    </div>
  )
}
