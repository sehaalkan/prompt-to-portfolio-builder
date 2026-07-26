import { type KeyboardEvent } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  const handleToggle = () => {
    toggleTheme()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleTheme()
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className="group flex h-9 w-9 items-center justify-center rounded-full border border-gallery-line/50 bg-white/40 text-neutral-600 backdrop-blur-sm transition-all duration-500 ease-in-out hover:scale-105 hover:border-neutral-400 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-400/30 dark:border-neutral-800/50 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-neutral-100 dark:focus:ring-neutral-500/30"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? (
        <Sun
          size={16}
          strokeWidth={1.5}
          className="transition-transform duration-500 ease-in-out group-hover:rotate-12"
          aria-hidden="true"
        />
      ) : (
        <Moon
          size={16}
          strokeWidth={1.5}
          className="transition-transform duration-500 ease-in-out group-hover:-rotate-12"
          aria-hidden="true"
        />
      )}
    </button>
  )
}
