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
import { Dialog, Tab, Transition } from '@headlessui/react'
import { BigNumber } from 'ethers/lib/ethers'
import { ethers } from 'ethers'
import toast, { Toaster } from 'react-hot-toast'
import { ThemeSwitcher } from '../../components/ThemeSwitcher'

interface Props {
  collection: Collection
}

function NFTDropPage({ collection }: Props) {
  const [claimedSupply, setClaimedSupply] = useState<number>(0)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [priceInEth, setPriceInEth] = useState<string>()
  const [quantity, setQuantity] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  let [isOpen, setIsOpen] = useState(false)
  const nftDrop = useNFTDrop('0xd9c5C9c42CD64beEf594408FBF15A4646Dc82DA9')

  // Auth
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()

  const leftToClaim = Number(totalSupply?.toString()) - claimedSupply

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

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

  const handleChange = (number: any) => {
    setQuantity(number)
  }

  const submitMint = (quantity: number) => {
    mintNft(quantity)
    setIsOpen(false)
  }

  const mintNft = (quantity: number) => {
    if (!nftDrop || !address) return

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
    <div className="flex h-screen flex-col bg-slate-100 text-black dark:bg-[#272727] dark:text-white lg:grid lg:grid-cols-10">
      <Toaster position="bottom-center" />
      {/* left */}
      <div className="bg-gradient-to-tl from-gray-200 to-gray-100 lg:col-span-4">
        <div className="flex flex-row items-center justify-center lg:min-h-screen lg:flex-col">
          <img
            className="h-60 w-full object-cover lg:h-auto lg:w-full lg:p-12"
            src={urlFor(collection.mainImage).url()}
            alt=""
          />
          <div className=" text-center  md:space-y-2">
            <h1 className="text-4xl font-bold text-black">
              <span className="hidden lg:flex">
                {' '}
                {collection.nftCollectionName}{' '}
              </span>
            </h1>
            <h2 className="text-md hidden uppercase text-red-900 lg:flex">
              {collection.description}
            </h2>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="flex flex-1 flex-col bg-slate-100 p-12 text-black dark:bg-[#272727] dark:text-white  lg:col-span-6 lg:p-6">
        {/* Header */}

        <header className="flex items-center justify-between ">
          <Link href="/">
            <h1 className="w-full cursor-pointer text-3xl font-extralight sm:w-full">
              <div className="text-center md:text-left ">
                The
                <span className="px-2 font-extrabold dark:text-purple-100">
                  Winsome Tenley
                </span>
              </div>
            </h1>
          </Link>
          <div className="hidden md:flex md:space-x-4 lg:flex lg:space-x-4">
            <button
              onClick={() => (address ? disconnect() : connectWithMetamask())}
              className="h-16 w-80 rounded-full bg-purple-100 font-bold text-black hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 dark:bg-gray-100 dark:hover:bg-purple-200 md:w-52"
            >
              <div className="w-full items-center text-3xl tracking-widest md:text-xl">
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
            <div className="flex md:mt-3">
              <ThemeSwitcher />
            </div>
          </div>
        </header>
        <hr className="my-8 border-red-900 dark:border-purple-200" />
        {/* Content */}
        <div className=" flex flex-1 flex-col items-center space-y-6 text-center">
          <div className="flex justify-between space-x-4 md:hidden lg:hidden">
            <button
              onClick={() => (address ? disconnect() : connectWithMetamask())}
              className="h-16 w-80 rounded-full bg-purple-100 font-bold text-black hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 dark:bg-gray-100 dark:hover:bg-purple-200 md:w-52"
            >
              <div className="w-full items-center text-3xl tracking-widest md:text-xl">
                {' '}
                {address ? (
                  address.substring(0, 5) +
                  '...' +
                  address.substring(address.length - 5)
                ) : (
                  <span className="w-full items-center">Connect</span>
                )}{' '}
              </div>
            </button>{' '}
            <div className="mt-3 flex">
              <ThemeSwitcher />
            </div>
          </div>
          <div className="font-bold text-gray-600 dark:text-gray-300 md:font-extrabold lg:text-xl lg:font-extrabold">
            <div className="mx-auto mt-12 mb-4 items-center text-6xl  text-red-900 dark:text-purple-200 lg:text-center lg:text-6xl">
              <span className=""> {collection.nftCollectionName} </span>
            </div>
            <div className="text-4xl font-medium text-gray-600 dark:text-gray-300 ">
              {collection.description}
            </div>
          </div>
          <div className="mx-auto  items-center">
            <div className=" mt-12 space-y-2 font-light">
              {loading ? (
                <p className=" text-2xl font-medium ">
                  loading Supply Count...{' '}
                </p>
              ) : (
                <div>
                  {' '}
                  <p className=" text-4xl font-medium text-red-900 dark:text-purple-200 ">
                    {leftToClaim} REMAINING!
                  </p>
                  <div className="text-gray-600 dark:text-gray-300">
                    Mint below
                  </div>
                </div>
              )}
            </div>
          </div>

          <>
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModal}
              >
                <div className="min-h-screen px-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-50" />
                  </Transition.Child>

                  {/* This element is to trick the browser into centering the modal contents. */}
                  <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-primary-light p-6 text-left align-middle text-black shadow-xl transition-all dark:bg-secondary-dark dark:text-white">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6"
                      >
                        The amount you want to Mint?
                      </Dialog.Title>

                      <div className="relative mt-4">
                        <input
                          className="max-w-sm rounded border border-red-900 bg-slate-100 px-4 py-2 shadow-md shadow-red-900 dark:border-purple-100 dark:bg-gray-300 dark:text-black dark:shadow-purple-100"
                          type="number"
                          placeholder="Amount to mint."
                          onChange={(e) => handleChange(e.target.value)}
                        />
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-primary-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2"
                          onClick={() => submitMint(quantity)}
                        >
                          Mint
                        </button>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
          </>
        </div>
        <div className="flex items-center justify-center space-x-4 text-lg">
          <a
            href="https://docs.ecto.xyz/ecto/start-here"
            target="_blank"
            className="cursor-pointer uppercase text-gray-600 underline hover:text-red-900 dark:text-gray-300 dark:hover:text-purple-100 md:block"
            rel="noreferrer"
          >
            Website
          </a>
          <a
            href="https://rinkeby.etherscan.io/address/0xd9c5c9c42cd64beef594408fbf15a4646dc82da9"
            className="cursor-pointer uppercase text-gray-600 underline hover:text-red-900 dark:text-gray-300 dark:hover:text-purple-100 md:block"
          >
            Contract
          </a>
          <a
            href={'https://rinkeby.etherscan.io/address/' + address}
            className="cursor-pointer uppercase text-gray-600 underline hover:text-red-900 dark:text-gray-300 dark:hover:text-purple-100 md:block"
          >
            Account
          </a>
        </div>
        {/* Mint Button */}
        <div className="p-4">
          {' '}
          <button
            // onClick={() => mintNft(quantity)}
            onClick={openModal}
            disabled={
              loading || claimedSupply === totalSupply?.toNumber() || !address
            }
            className="h-16 w-full rounded-full bg-purple-100 font-bold text-black hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 disabled:bg-gray-400 dark:bg-gray-100 dark:hover:bg-purple-200"
          >
            {loading ? (
              <>Loading</>
            ) : claimedSupply === totalSupply?.toNumber() ? (
              <>SOLD OUT</>
            ) : !address ? (
              <p className="text-xl">Connect wallet to Mint</p>
            ) : (
              <span className="font-bold"> Mint NFT ({priceInEth}) ETH</span>
            )}
          </button>
        </div>
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
