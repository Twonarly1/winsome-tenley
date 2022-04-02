interface Image {
  image: {
    url: string
  }
}

export interface Creator {
  _id: string
  name: string
  address: string
  slug: {
    current: string
  }
  image: Image
  bio: string
}

export interface Collection {
  _id: string
  title: string
  description: string
  nftCollectionName: string
  address: string
  slug: {
    current: String
  }
  creator: Creator
  mainImage: Image
  previewImage: Image
}

export interface unclaimedNFTs {
  [x: string]: Json
  description?: string | undefined
  image?: string | undefined
  external_url?: string | undefined
  animation_url?: string | undefined
  properties?: Record<string, Json> | undefined
  name: string
  id: ethers.BigNumber
  uri: string
}

export type SwiperItemType = {
  imageSrc: string
  imageAlt: string
}
