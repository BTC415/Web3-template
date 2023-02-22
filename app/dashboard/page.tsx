'use client'

import { WalletAddress, WalletBalance } from '@turbo-eth/core-wagmi'
import { motion } from 'framer-motion'

import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'

export default function PageDashboard() {
  return (
    <>
      <motion.div
        className="flex-center flex h-full w-full"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}>
        <div className="flex-center col-span-12 flex flex-col lg:col-span-9">
          <div className="text-center">
            <h3 className="font-primary text-2xl font-bold lg:text-6xl">
              <span className="text-gradient-secondary">Hello, Web3 User</span> 👋
            </h3>
            <span className="font-light">
              <WalletAddress className="mt-5 block text-xl font-light" />
              <div className="mt-4">
                <span className="font-primary text-3xl font-light">
                  Balance: <WalletBalance decimals={7} className="" /> ETH
                </span>
              </div>
            </span>
          </div>
        </div>
      </motion.div>
    </>
  )
}
