import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <ThemeProvider attribute="class">
        <Head>
          <title>Winsome Tenley</title>
          <link rel="icon" href="/two.png" />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </ThirdwebProvider>
  )
}

export default MyApp
