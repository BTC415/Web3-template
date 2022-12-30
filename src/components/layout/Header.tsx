import React from 'react'

import { Flex, Heading, Spacer, useColorModeValue } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import classNames from 'classnames'

import { SITE_NAME } from 'utils/config'

import { LinkComponent } from './LinkComponent'
import { ThemeSwitcher } from './ThemeSwitcher'

interface Props {
  className?: string
}

export function Header(props: Props) {
  const classes = classNames(props.className, 'Header', 'bg-gray-200 dark:bg-gray-900 dark:text-white px-4 py-3 mb-8 flex items-center')

  return (
    <header className={classes} px={4} py={2} mb={8} alignItems="center">
      <LinkComponent href="/">
        <h1 className="text-2xl font-bold">{SITE_NAME}</h1>
      </LinkComponent>

      <div className="flex-1" />

      <div className="flex items-center">
        <ConnectButton />
        <div className="mx-2" />
        <ThemeSwitcher />
      </div>
    </header>
  )
}
