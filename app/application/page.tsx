'use client'
import { motion } from 'framer-motion'

import BranchIsAuthenticated from '@/components/shared/branch/BranchIsAuthenticated'
import BranchIsWalletConnected from '@/components/shared/branch/BranchIsWalletConnected'
import ButtonSIWELogin from '@/components/web3/siwe/ButtonSIWELogin'
import ButtonSIWELogout from '@/components/web3/siwe/ButtonSIWELogout'
import WalletConnect from '@/components/web3/WalletConnect'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

export default function PageApplication() {
  return (
    <>
      <div className="flex-center flex flex-1 flex-col items-center justify-center text-center">
        <motion.div
          className="max-w-3xl px-5 xl:px-0"
          initial="hidden"
          whileInView="show"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}>
          {/* <h3 className="text-6xl font-normal">💻</h3> */}
          <motion.h3 variants={FADE_DOWN_ANIMATION_VARIANTS} className="text-6xl font-normal">
            💻
          </motion.h3>
          <motion.h1
            className="text-gradient-sand text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-8xl md:leading-[6rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}>
            Application
          </motion.h1>
          <motion.h5 className="my-4 text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
            Authenticate using Sign-In With Ethereum (SIWE)
          </motion.h5>
        </motion.div>

        <div className="container mx-auto mt-10  max-w-screen-xl gap-6 text-center">
          <BranchIsWalletConnected>
            <BranchIsAuthenticated>
              <ButtonSIWELogout className="btn btn-blue btn-lg " />
              <ButtonSIWELogin className="btn btn-pill btn-emerald btn-lg min-h-[70px] min-w-[200px] text-xl" label="ΞID Connect" />
            </BranchIsAuthenticated>
            <WalletConnect className="mx-auto inline-block" />
          </BranchIsWalletConnected>
        </div>
      </div>
    </>
  )
}
