/* eslint-disable @next/next/link-passhref */
import Link from 'next/link'
import React from 'react'
import { Button } from '../ButtonGroup'
import { ThemeSwitcher } from '../ThemeSwitcher'

export const Header = () => {
  return (
    <div>
      {' '}
      <div className="mx-auto h-20 w-full max-w-7xl items-center justify-between p-4 text-center">
        <Link href="/">
          <div className="ml-2 mt-2 cursor-pointer items-center text-4xl font-extrabold dark:text-purple-100 ">
            <span className="text-2xl font-medium text-black dark:text-gray-300">
              The
            </span>{' '}
            WINSOME TENLEY
          </div>
        </Link>
      </div>
      <div className="mt-2 flex items-center">
        <div className="my-8 flex-grow border-t border-red-900 dark:border-purple-200"></div>
        <span className="-mt-3 flex-shrink">
          <ThemeSwitcher />
        </span>

        <div className="my-8 flex-grow border-t border-red-900 dark:border-purple-200"></div>
        <span className="flex-shrink items-center">
          <Button />
        </span>
        <div className="my-8 flex-grow border-t border-red-900 dark:border-purple-200"></div>
      </div>
    </div>
  )
}
