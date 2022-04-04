/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
import type { GetServerSideProps } from 'next'
import Link from 'next/link'
import { ThemeSwitcher } from '../components/ThemeSwitcher'
import { sanityClient, urlFor } from '../sanity'
import { Collection, unclaimedNFTs } from '../typings'

interface Props {
  collections: Collection[]
  unclaimedNFTs: unclaimedNFTs[]
}

const Home = ({ collections }: Props) => {
  return (
    <div className="min-h-screen bg-primary-light p-4 text-center dark:bg-primary-dark dark:text-gray-300">
      <div>
        {' '}
        <div className="mx-auto h-16 w-full max-w-7xl items-center justify-between p-2 text-center">
          <Link href="/">
            <div className="ml-2 cursor-pointer items-center text-4xl font-extrabold text-red-900 dark:text-purple-100 ">
              <span className="text-2xl font-medium text-black dark:text-gray-300">
                The
              </span>{' '}
              WINSOME TENLEY
            </div>
          </Link>
        </div>
      </div>
      <div className="mt-2 mb-2 flex-grow border-t border-red-900 dark:border-purple-200"></div>
      <div className="mx-auto w-80 text-lg tracking-wider dark:font-light">
        Choose a collection to mint from below.
      </div>
      <div className="-mt-12 grid gap-12 p-24 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {collections.map((collection, idx) => (
          <Link key={idx} href={`/nft/${collection.slug.current}`}>
            <div className="group relative cursor-pointer transition duration-500 ease-in-out hover:rotate-1 hover:scale-105">
              <div className="animate-tilt group-hover:duration-600 absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 blur transition duration-1000 group-hover:opacity-80"></div>
              <div className="relative mx-auto items-center justify-between rounded-xl bg-white object-cover p-2 leading-none transition duration-200 hover:text-red-900 dark:bg-slate-600 dark:hover:text-purple-200">
                <img
                  className="lg:w-38 h-auto flex-shrink rounded-2xl object-cover sm:w-full"
                  src={urlFor(collection.previewImage).url()}
                  alt=""
                />
                <div className="text-overflow overflow-hidden p-2 text-center text-3xl">
                  {collection.title}
                  <p className="text-overflow items-center overflow-hidden text-center text-sm ">
                    {collection.nftCollectionName}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center py-2">
        <div className=" flex-grow border-t border-red-900 dark:border-purple-200"></div>
        <span className="-mt-1 flex-shrink">
          <ThemeSwitcher />
        </span>

        <div className=" flex-grow border-t border-red-900 dark:border-purple-200"></div>
      </div>
      <footer className="bg-primary-light text-center text-sm font-light uppercase tracking-widest dark:bg-primary-dark">
        <span className="text-slate-600 dark:text-gray-300">
          Designed by twonarly
        </span>
      </footer>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"]{
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

  const collections = await sanityClient.fetch(query)
  console.log(collections)

  return {
    props: {
      collections,
    },
  }
}
