/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Carousel } from '../components/Carousel/Carousel'
import { ThemeSwitcher } from '../components/ThemeSwitcher'
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
    <div className="mx-auto flex min-h-screen w-full flex-col bg-[#dddddd] p-4 px-10 text-black dark:bg-[#272727] dark:text-white 2xl:px-0">
      <Head>
        <title>Winsome Tenley</title>
        <link rel="icon" href="/two.png" />
      </Head>{' '}
      <div className="p-">
        <Carousel />
      </div>
      <div className="text-center text-lg font-bold">
        <div className="mx-auto mt-2 items-center text-6xl lg:text-6xl">
          <span className="text-2xl tracking-widest text-red-900 dark:text-purple-100">
            Choose a collection to mint from below.
          </span>
          <div className="flex-grow border-t border-red-900 p-1 dark:border-purple-100  dark:font-extralight"></div>
          <span className="">THE WINSOME TENLEY</span>
        </div>
      </div>
      <div className="p-4 lg:p-8">
        {' '}
        <div className="grid md:p-4 lg:grid-cols-3 lg:space-x-16 2xl:grid-cols-3 2xl:p-12">
          {collections.map((collection, i) => (
            <Link key={i} href={`/nft/${collection.slug.current}`}>
              <div className="mt-10 bg-slate-100 shadow-xl shadow-red-900 ">
                <div
                  key={i}
                  className="flex cursor-pointer flex-col items-center "
                >
                  <img
                    className="h-40 w-full object-cover shadow-xl shadow-purple-50 transition-all duration-200 hover:scale-105 md:h-96 md:w-full"
                    src={urlFor(collection.mainImage).url()}
                    alt=""
                  />
                  <div className="mb-2 mt-4">
                    <h2 className="text-overflow overflow-hidden text-center text-3xl">
                      {collection.title}
                    </h2>
                    <p className="text-overflow items-center overflow-hidden text-center text-sm text-red-900">
                      {collection.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            //
          ))}
        </div>
      </div>
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
