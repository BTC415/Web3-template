import '../styles/global.css'
import '../styles/app.css'
import '../styles/components.css'
import { useEffect } from 'react'

import { Raleway } from '@next/font/google'
import localFont from '@next/font/local'
import type { AppProps } from 'next/app'
import { ModalProvider } from 'react-modal-hook'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { Provider as RWBProvider } from 'react-wrap-balancer'
import { SWRConfig } from 'swr'
import { useAccount } from 'wagmi'

import { siweLogout } from '@/actions/siweLogout'
import { Layout } from '@/components/layout'
import { useIsMounted } from '@/hooks/useIsMounted'
import fetchJson from '@/lib/fetchJson'
import { RainbowKit } from '@/providers/RainbowKit'

const sfPro = localFont({
  src: '../styles/SF-Pro-Display-Medium.otf',
  variable: '--font-sf',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '400', '500', '600', '700', '800', '900'],
  variable: '--font-raleway',
})

const HandleWalletEvents = ({ children }: any): any => {
  useAccount({
    onDisconnect() {
      siweLogout()
    },
  })
  return <>{children}</>
}

const queryClient = new QueryClient()
export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted()

  useEffect(() => {
    queryClient.invalidateQueries()
  }, [])

  return (
    <>
      <style jsx global>
        {`
          :root {
            --sfPro-font: ${sfPro.style.fontFamily};
            --raleway-font: ${raleway.style.fontFamily};
          }
        `}
      </style>
      <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: (err) => {
            console.error(err)
          },
        }}>
        {isMounted && (
          <QueryClientProvider client={queryClient}>
            <RWBProvider>
              <ModalProvider>
                <RainbowKit>
                  <HandleWalletEvents>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </HandleWalletEvents>
                </RainbowKit>
              </ModalProvider>
            </RWBProvider>
          </QueryClientProvider>
        )}
      </SWRConfig>
    </>
  )
}
