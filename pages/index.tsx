/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
import type { GetServerSideProps } from 'next'
import Link from 'next/link'
import { Carousel } from '../components/Carousel/Carousel'
import { Footer } from '../components/Footer'
import { ThemeSwitcher } from '../components/ThemeSwitcher'
import { sanityClient, urlFor } from '../sanity'
import { Collection, unclaimedNFTs } from '../typings'

interface Props {
  collections: Collection[]
  unclaimedNFTs: unclaimedNFTs[]
}

const Home = ({ collections }: Props) => {
  return (
    <>
      <div className="min-h-screen bg-primary-light p-4 text-center dark:bg-primary-dark dark:text-gray-300">
        <Carousel />
        <div className="mt-12 flex-grow border-t border-red-900 p-1 dark:border-purple-200 "></div>

        <div className="mx-auto mt-4 text-4xl font-medium tracking-wider text-red-900 dark:text-gray-300">
          THE WINSOME TENLEY
          <div className="mx-auto mt-4 w-80 text-lg dark:font-medium md:w-full">
            Choose a collection to mint from below.
          </div>
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
        <Footer />
        <div className="mb-2">
          <ThemeSwitcher />
        </div>
      </div>
    </>
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
