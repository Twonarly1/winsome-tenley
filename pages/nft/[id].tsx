import React, { Fragment, useEffect, useState } from 'react'
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNFTDrop,
} from '@thirdweb-dev/react'
import { GetServerSideProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from '../../typings'
import { Dialog, Transition } from '@headlessui/react'
import { BigNumber } from 'ethers/lib/ethers'
import toast, { Toaster } from 'react-hot-toast'
import { Header } from '../../components/Header'
import Image from 'next/image'

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
    <div className="flex h-screen flex-col bg-slate-100 text-red-900 dark:bg-primary-dark dark:text-gray-300">
      <Toaster position="bottom-center" />
      <Header />

      {/* Content */}
      <div className="flex flex-1 flex-col items-center text-center">
        <div className="mt-6 flex flex-1 flex-col bg-slate-100 px-12 text-black dark:bg-[#272727] dark:text-white">
          <div className="font-bold text-gray-600 dark:text-gray-300 md:font-extrabold ">
            <div className="mx-auto text-4xl text-gray-600 dark:font-medium dark:text-gray-300">
              {collection.nftCollectionName}
            </div>
            <div className="mb-4 text-lg font-light tracking-wider text-gray-600 dark:text-gray-300 ">
              {collection.description}
            </div>
          </div>
          <div className="px-12">
            <div className="group relative cursor-pointer transition duration-500 ease-in-out hover:rotate-1 hover:scale-105">
              <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-80"></div>{' '}
              <div className="relative justify-between rounded-xl bg-white object-cover p-2 leading-none transition duration-200 hover:text-red-900 dark:bg-slate-600 dark:hover:text-purple-200">
                <Image
                  src={urlFor(collection.previewImage).url()}
                  width={400}
                  height={400}
                  alt=""
                  className="rounded-lg pt-2"
                />
              </div>
            </div>
          </div>
          <div className="mx-auto mt-6 space-y-6">
            <div className="animate-pulse text-2xl font-medium text-gray-600 dark:text-gray-300">
              {loading ? (
                <p>loading Supply Count... </p>
              ) : (
                <div className="font-medium text-red-900 dark:text-purple-200 ">
                  {leftToClaim} /{totalSupply?.toString()} Remaining
                </div>
              )}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              {' '}
              Mint Fee: {priceInEth}
            </div>
            <div className="group relative">
              <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-100"></div>
              <div className="relative divide-gray-600 rounded-full bg-white p-2 leading-none text-red-900 transition duration-200 hover:text-purple-500 dark:bg-slate-600 dark:text-blue-200 dark:hover:text-purple-300">
                {' '}
                <button
                  className="text-xl tracking-widest"
                  onClick={openModal}
                  disabled={
                    loading ||
                    claimedSupply === totalSupply?.toNumber() ||
                    !address
                  }
                >
                  {loading ? (
                    <>Loading</>
                  ) : claimedSupply === totalSupply?.toNumber() ? (
                    <>SOLD OUT</>
                  ) : !address ? (
                    <button
                      onClick={() =>
                        address ? disconnect() : connectWithMetamask()
                      }
                    >
                      {address ? '' : 'Connect'}
                    </button>
                  ) : (
                    <span className="py-2 px-4 uppercase text-red-900 transition duration-200 hover:text-purple-500  dark:text-blue-200 dark:hover:text-purple-300">
                      {' '}
                      Mint
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <footer className="bg-slate-100 py-4 text-center text-sm font-light uppercase tracking-widest dark:bg-primary-dark">
          <span className="text-slate-600 dark:text-gray-300">
            Designed by twonarly
          </span>
        </footer>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen  px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-80" />
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
                  className="text-center text-xl font-medium leading-6 text-red-900 dark:text-gray-300"
                >
                  Enter the amount you want to mint.
                </Dialog.Title>

                <div className="relative mt-4 p-4 text-center">
                  <input
                    className="max-w-sm rounded border border-red-900 bg-slate-100 px-4 py-2 text-center shadow-md shadow-red-900 hover:scale-105 dark:border-purple-100 dark:bg-gray-300 dark:text-black dark:shadow-purple-100"
                    type="number"
                    placeholder="0"
                    onChange={(e) => handleChange(e.target.value)}
                  />
                </div>
                <div className="mt-4 p-4">
                  <button
                    type="button"
                    className="text-widest hover: w-full rounded border border-red-900 bg-slate-100 px-4 py-2 font-bold tracking-widest text-red-900 hover:scale-105 dark:bg-purple-100 dark:text-black"
                    onClick={() => submitMint(quantity)}
                  >
                    MINT
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
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
