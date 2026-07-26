import { useState, useRef, useCallback, type DragEvent, type KeyboardEvent } from 'react'
import { ImagePlus } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

type DashDropZoneProps = {
  onFilesSelected: (files: File[]) => void
  disabled?: boolean
}

export const DashDropZone = ({
  onFilesSelected,
  disabled = false,
}: DashDropZoneProps) => {
  const { t } = useLanguage()
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

  const isActive = isDragging && !disabled

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={t.dropzoneAria}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        group dash-dropzone box-border flex w-full flex-col items-center justify-center
        min-h-[260px] md:min-h-[300px] cursor-pointer
        border-2 border-dashed border-neutral-300 transition-all duration-300
        hover:border-solid hover:border-neutral-950
        dark:border-neutral-700 dark:hover:border-neutral-100
        ${isActive ? 'dash-dropzone-active border-solid border-neutral-950 dark:border-neutral-100' : ''}
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

      <div className="relative z-10 flex flex-col items-center gap-5 p-10">
        <div
          className={`
            flex h-14 w-14 items-center justify-center rounded-full border border-dashed
            border-neutral-300 bg-white/50 transition-all duration-300
            group-hover:border-solid group-hover:border-neutral-900
            dark:border-neutral-700 dark:bg-neutral-900/40 dark:group-hover:border-neutral-100
            ${isActive ? 'border-solid border-neutral-900 dark:border-neutral-100' : ''}
          `}
        >
          <ImagePlus
            className="h-6 w-6 text-neutral-900 opacity-70 dark:text-neutral-100"
            strokeWidth={1.25}
            aria-hidden="true"
          />
        </div>

        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
            {isDragging ? t.dropzoneRelease : t.dropzoneTitle}
          </p>
          <p className="mt-1 text-xs font-light text-neutral-400">
            {t.dropzoneHint}
          </p>
        </div>
      </div>
    </div>
  )
}
