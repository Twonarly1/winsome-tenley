import React from 'react'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'
import Copy from '../../components/Copy'
import Identicon from '../../components/Identicon'

function NFTDropPage() {
  // Auth
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()
  // --
  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* left */}
      <div className="bg-gradient-to-tl  from-gray-200 to-gray-100 lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="mt-4 p-2">
            <img
              className="w-56 object-cover lg:h-96 lg:w-80 "
              src="https://links.papareact.com/8sg"
              alt=""
            />
          </div>
          <div className="space-y-2 p-5 text-center">
            <h1 className="text-4xl font-bold text-black">Winsome Tenley </h1>
            <h2 className="text-md uppercase text-red-900">
              A Winsome collection. Grow together.
            </h2>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        {/* Header */}
        <header className="flex items-center justify-between ">
          <h1 className="w-full cursor-pointer text-xl font-extralight sm:w-full">
            <div className="text-center md:text-left ">
              The
              <span className="px-1 font-extrabold">Winsome Tenley</span>
              NFT Market Place
            </div>
          </h1>
          <div className="hidden md:flex md:space-x-2">
            {' '}
            <Copy toCopy={address}></Copy>
            <button
              onClick={() => (address ? disconnect() : connectWithMetamask())}
              className="rounded-full bg-gray-100 px-5 py-3 text-lg font-bold text-black hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 lg:px-5 lg:py-3 lg:text-xl"
            >
              <div className="flex items-center">
                {' '}
                {address ? (
                  address.substring(0, 5) +
                  '...' +
                  address.substring(address.length - 5)
                ) : (
                  <span className="ml-1">Connect</span>
                )}{' '}
              </div>
            </button>
          </div>
        </header>

        <hr className="my-6 border-indigo-300" />

        {/* Content */}
        <div className="mt-6 flex flex-1 flex-col items-center space-y-6 text-center lg:justify-center lg:space-y-0">
          <button
            onClick={() => (address ? disconnect() : connectWithMetamask())}
            className="h-16 w-full rounded-full bg-gray-100 font-bold text-black hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 md:hidden"
          >
            <div className="w-full items-center tracking-widest">
              {' '}
              {address ? (
                address.substring(0, 5) +
                '...' +
                address.substring(address.length - 5)
              ) : (
                <span className="w-full items-center">Connect</span>
              )}{' '}
            </div>
          </button>

          <h1 className="-text-left text-3xl font-bold lg:text-xl lg:font-extrabold">
            <div className="mx-auto mt-6 items-center text-6xl lg:text-center">
              THE WINSOME TENLEY
            </div>
          </h1>
          <p className="p-8 text-3xl font-bold text-red-900">
            13 / 21 NFT's claimed
          </p>
        </div>
        {/* Mint Button */}
        <button className=" h-16 w-full rounded-full bg-gray-100 font-bold text-black hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
          {' '}
          Mint NFT (0.01 ETH){' '}
        </button>
      </div>
    </div>
  )
}

export default NFTDropPage
