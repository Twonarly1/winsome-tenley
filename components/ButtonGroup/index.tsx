import { useMetamask, useAddress, useDisconnect } from '@thirdweb-dev/react'
import React from 'react'

export const Button = () => {
  // Auth
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()
  return (
    <div className="group relative">
      <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-100"></div>
      <div className="relative flex items-center space-x-4 divide-gray-600 rounded-full  bg-white p-4 leading-none text-red-900 transition duration-200 hover:text-purple-500 dark:bg-slate-600 dark:text-blue-200 dark:hover:text-purple-300">
        <button
          onClick={() => (address ? disconnect() : connectWithMetamask())}
        >
          <div className="w-full items-center space-x-2 text-2xl tracking-wider md:text-3xl">
            {address ? (
              address.substring(0, 5) +
              '...' +
              address.substring(address.length - 5)
            ) : (
              <span className="w-full items-center">Connect</span>
            )}
          </div>
        </button>
      </div>
    </div>
  )
}
