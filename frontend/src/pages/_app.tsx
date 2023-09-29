import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Layout1 from '@/Compnents/Layout'

function App ({ Component, pageProps }: AppProps): JSX.Element {
  return (
  <Layout1>
    <Component {...pageProps} />
  </Layout1>)
}

// Disabling SSR
export default dynamic(async () => await Promise.resolve(App), { ssr: false })
