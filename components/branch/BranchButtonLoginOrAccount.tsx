import * as React from 'react'

import Link from 'next/link'

import BranchIsAuthenticated from '@/components/branch/BranchIsAuthenticated'
import BranchIsWalletConnected from '@/components/branch/BranchIsWalletConnected'
import ButtonSIWELogin from '@/components/siwe/ButtonSIWELogin'
import ButtonSIWELogout from '@/components/siwe/ButtonSIWELogout'

interface BranchButtonLoginOrAccountProps {
  className?: string
  classNameButtonLogin?: string
  classNameButtonLogout?: string
}

export const BranchButtonLoginOrAccount = ({ classNameButtonLogin, classNameButtonLogout }: BranchButtonLoginOrAccountProps) => {
  return (
    <BranchIsWalletConnected>
      <BranchIsAuthenticated>
        <div className="flex items-center gap-3">
          <Link href="/account">
            <span className="tag tag-light">Account</span>
          </Link>
          <ButtonSIWELogout className={classNameButtonLogout} />
        </div>
        <ButtonSIWELogin className={classNameButtonLogin} />
      </BranchIsAuthenticated>
      <></>
    </BranchIsWalletConnected>
  )
}

export default BranchButtonLoginOrAccount
