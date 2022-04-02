/* eslint-disable @next/next/link-passhref */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useEffect, useState } from 'react'
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNFTDrop,
} from '@thirdweb-dev/react'
//import Copy from '../../components/Copy'
//import Identicon from '../../components/Identicon'
import { GetServerSideProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from '../../typings'
import Link from 'next/link'
import Clock from 'react-live-clock'
import Copy from '../../components/Copy'
import { Tab } from '@headlessui/react'
import { BigNumber } from 'ethers/lib/ethers'
import { ethers } from 'ethers'
import toast, { Toaster } from 'react-hot-toast'

interface Props {
  collection: Collection
}

function NFTDropPage({ collection }: Props) {
  const [claimedSupply, setClaimedSupply] = useState<number>(0)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [priceInEth, setPriceInEth] = useState<string>()
  const [loading, setLoading] = useState<boolean>(true)
  const nftDrop = useNFTDrop('0xd9c5C9c42CD64beEf594408FBF15A4646Dc82DA9')

  // Auth
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()

  useEffect(() => {
    const fetchPrice = async () => {
      const claimedConditions = await nftDrop?.claimConditions.getAll()
      setPriceInEth(claimedConditions?.[0].currencyMetadata.displayValue)
    }

    fetchPrice()
  }, [nftDrop])

  useEffect(() => {
    if (!nftDrop) return

    const fetchNFTDropData = async () => {
      setLoading(true)

      const claimed = await nftDrop.getAllClaimed()
      const total = await nftDrop.totalSupply()

      setClaimedSupply(claimed.length)
      setTotalSupply(total)

      setLoading(false)
    }
    fetchNFTDropData()
  }, [nftDrop])

  const mintNft = () => {
    if (!nftDrop || !address) return

    const quantity = 1

    setLoading(true)
    const notification = toast.loading('Minting...', {
      style: {
        background: 'white',
        color: 'green',
        fontWeight: 'bolder',
        fontSize: '17px',
        padding: '20px',
      },
    })

    nftDrop
      .claimTo(address, quantity)
      .then(async (tx) => {
        const receipt = tx[0].receipt
        const claimedTokenId = tx[0].id
        const claimedNFT = await tx[0].data()

        toast('HOORAY.. You Successfully Minted!', {
          duration: 8000,
          style: {
            background: 'green',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px',
          },
        })

        console.log(receipt)
        console.log(claimedTokenId)
        console.log(claimedNFT)
      })
      .catch((err) => {
        console.log(err)
        toast('Whoops... Something went wrong!', {
          style: {
            background: 'red',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px',
          },
        })
      })
      .finally(() => {
        setLoading(false)
        toast.dismiss(notification)
      })
  }

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      <Toaster position="bottom-center" />
      {/* left */}
      <div className="bg-gradient-to-tl  from-gray-200 to-gray-100 lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <img
            className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
            src={urlFor(collection.previewImage).url()}
            alt=""
          />
          <div className="space-y-2 p-5 text-center">
            <h1 className="text-4xl font-bold text-black">
              {collection.nftCollectionName}{' '}
            </h1>
            <h2 className="text-md uppercase text-red-900">
              {collection.description}
            </h2>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        {/* Header */}
        <header className="flex items-center justify-between ">
          <Link href="/">
            <h1 className="w-full cursor-pointer text-xl font-extralight sm:w-full">
              <div className="text-center md:text-left ">
                The
                <span className="px-1 font-extrabold">Winsome Tenley</span>
                NFT Market Place
              </div>
            </h1>
          </Link>
          <div className="hidden md:flex md:space-x-2">
            {address ? (
              <div>
                <Copy toCopy={address} />
              </div>
            ) : (
              ''
            )}{' '}
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

        <hr className="my-6 border-red-900" />

        {/* Content */}
        <div className="mt-6 flex flex-1 flex-col items-center space-y-6 text-center lg:justify-center lg:space-y-0">
          <div className="flex w-full justify-between space-x-4">
            {' '}
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
            {address ? (
              <div className="mt-1 md:hidden">
                <Copy toCopy={address} />
              </div>
            ) : (
              ''
            )}{' '}
          </div>

          <h1 className="-text-left text-3xl font-medium lg:text-xl lg:font-extrabold">
            <div className="mx-auto mb-6 mt-6 items-center text-6xl  text-black lg:text-center">
              {collection.title} Collection
            </div>
          </h1>
          <Tab.Group>
            <Tab.List className="space-x-8 text-3xl">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button className={selected ? 'text3xl text-red-900' : ''}>
                    Details
                  </button>
                )}
              </Tab>{' '}
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button className={selected ? 'text3xl text-red-900' : ''}>
                    Wallet
                  </button>
                )}
              </Tab>{' '}
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button className={selected ? 'text-3xl text-red-900' : ''}>
                    Community
                  </button>
                )}
              </Tab>{' '}
            </Tab.List>
            <Tab.Panels className="w-full rounded-3xl ">
              <Tab.Panel>
                {' '}
                {loading ? (
                  <p className="mt-12 p-2 text-xl font-medium ">
                    loading Supply Count...{' '}
                  </p>
                ) : (
                  <p className="mt-12 p-2 text-xl font-medium ">
                    {claimedSupply} / {totalSupply?.toString()} NFT's claimed
                  </p>
                )}
                {loading && (
                  <img
                    className="h-80 w-80 object-contain"
                    src={
                      'https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif'
                    }
                    alt=""
                  />
                )}
                <p className="p-2 text-xl font-medium ">
                  Contract information can be found here:
                </p>
                <p className="p-2 text-xl font-medium ">
                  Time until Mint Ends?
                </p>
              </Tab.Panel>
              <Tab.Panel>
                <p className="p-8 text-xl ">
                  {' '}
                  Your NFT's from this collection:
                </p>
                <img src="/451.png" alt="" className="mx-auto h-40 w-40" />
              </Tab.Panel>
              <Tab.Panel>
                <p className="p-8">
                  {' '}
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. "
                </p>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
        {/* Mint Button */}
        <button
          onClick={mintNft}
          disabled={
            loading || claimedSupply === totalSupply?.toNumber() || !address
          }
          className=" h-16 w-full rounded-full bg-gray-100 font-bold text-black hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 disabled:bg-gray-400"
        >
          {loading ? (
            <>Loading</>
          ) : claimedSupply === totalSupply?.toNumber() ? (
            <>SOLD OUT</>
          ) : !address ? (
            <>Sign in to Mint</>
          ) : (
            <span className="font-bold"> Mint NFT ({priceInEth}) ETH</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $id][0]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
      asset
    },
    previewImage {
      asset
    },
    slug {
      current
    },
    creator-> {
      _id,
      name,
      address,
      slug {
        current
    },
  },
}`

  const collection = await sanityClient.fetch(query, {
    id: params?.id,
  })

  if (!collection) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      collection,
    },
  }
}
