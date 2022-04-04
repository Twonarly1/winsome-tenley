import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

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

          <div className=" relative flex items-center space-x-4 divide-gray-600 rounded-full bg-white p-4 leading-none text-blue-500 transition duration-200 hover:text-purple-500 dark:bg-slate-600 dark:text-blue-200 dark:hover:text-purple-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="h-9 w-9"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993S6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007S8.993 13.658 8.993 12S10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 18.363l2.12-2.122l1.415 1.414l-2.12 2.122zM16.24 6.344l2.122-2.122l1.414 1.414l-2.122 2.122zM6.342 7.759L4.22 5.637l1.415-1.414l2.12 2.122zm13.434 10.605l-1.414 1.414l-2.122-2.122l1.414-1.414z"
              />
            </svg>
          </div>
        </div>
      ) : (
        <div className="group relative">
          <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-100"></div>

          <div className="relative flex items-center space-x-4 divide-gray-600 rounded-full  bg-white p-4 leading-none text-red-900 transition duration-200 hover:text-purple-500 dark:bg-slate-600 dark:text-blue-200 dark:hover:text-purple-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="h-9 w-9"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 16 16"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M1.75 8c0 3.45 2.8 6.25 6.25 6.25c3.41-.003 6.25-3 6.25-6c-1 .5-4 1.5-6-.5s-1-5-.5-6c-3 0-6 2.84-6 6.25z"
              />
            </svg>
          </div>
        </div>
      )}
    </button>
  )
}
