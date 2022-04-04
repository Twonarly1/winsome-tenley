import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/outline'

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className=" h-9 items-center"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <div className="group relative">
          <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-100"></div>

          <div className=" relative flex items-center divide-gray-600 rounded-full bg-white p-2 leading-none text-blue-500 transition duration-200 hover:text-purple-500 dark:bg-slate-600 dark:text-blue-200 dark:hover:text-purple-300">
            <div className="h-7 w-7">
              <SunIcon />
            </div>
          </div>
        </div>
      ) : (
        <div className="group relative">
          <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-100"></div>

          <div className="relative flex items-center divide-gray-600 rounded-full  bg-white p-2 leading-none text-red-900 transition duration-200 hover:text-purple-500 dark:bg-slate-600 dark:text-blue-200 dark:hover:text-purple-300">
            <div className="h-7 w-7">
              <SunIcon />
            </div>
          </div>
        </div>
      )}
    </button>
  )
}
