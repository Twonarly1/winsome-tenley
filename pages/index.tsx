/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Carousel } from '../components/Carousel/Carousel'
import Locales from '../components/Locales'
import { sanityClient, urlFor } from '../sanity'
import { Collection, unclaimedNFTs } from '../typings'

interface Props {
  collections: Collection[]
  unclaimedNFTs: unclaimedNFTs[]
}

const Home = ({ collections }: Props) => {
  const { asPath } = useRouter()

  // You can switch out this provider with any wallet or provider setup you like.

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col py-20 px-10 2xl:px-0">
      <Head>
        <title>Winsome Tenley</title>
        <link rel="icon" href="/two.png" />
      </Head>{' '}
      <Carousel />
      <div className="text-center text-lg font-bold">
        <div className="mx-auto mt-20 items-center text-6xl lg:text-6xl">
          <span className="text-2xl text-red-900">
            Choose a collection to mint from.
          </span>
          <div className="flex-grow border-t border-gray-400 p-1"></div>
          THE WINSOME TENLEY
        </div>
      </div>
      <main className="mt-20 bg-slate-100 p-10 shadow-xl shadow-red-900">
        <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {collections.map((collection, i) => (
            <Link key={i} href={`/nft/${collection.slug.current}`}>
              <div
                key={i}
                className="mt-4 flex cursor-pointer flex-col items-center  transition-all duration-200 hover:scale-105"
              >
                <img
                  className="h-40 w-80 rounded-2xl object-cover md:h-96 md:w-60"
                  src={urlFor(collection.mainImage).url()}
                  alt=""
                />
                <div>
                  <h2 className="mt-4 text-center text-3xl">
                    {collection.title}
                  </h2>
                  <p className="items-center text-center text-sm text-red-900">
                    {collection.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
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
