import * as React from 'react'

import * as Form from '@radix-ui/react-form'
import { useErc20Decimals } from '@turbo-eth/erc20-wagmi'
import { BigNumber } from 'ethers'
import { useDebounce } from 'usehooks-ts'
import { useAccount, useWaitForTransaction } from 'wagmi'

import { useLoadContractFromChainId } from '@/actions/pooltogether-v4/hooks/use-load-contract-from-chain-id'
import { useUserBalanceWithdraw } from '@/actions/pooltogether-v4/hooks/use-user-balance-withdraw'
import { usePoolTogetherPrizePoolWithdrawFrom } from '@/actions/pooltogether-v4/pooltogether-v4-wagmi'
import { PRIZE_POOL_CONTRACT } from '@/actions/pooltogether-v4/utils/prize-pool-contract-list'
import { TICKET_CONTRACT } from '@/actions/pooltogether-v4/utils/ticket-contract-list'

export function FormWithdraw() {
  const { address } = useAccount()
  const userBalance = useUserBalanceWithdraw()
  const prizePoolAddress = useLoadContractFromChainId(PRIZE_POOL_CONTRACT)
  const ticketAddress = useLoadContractFromChainId(TICKET_CONTRACT)

  const { data: decimals } = useErc20Decimals({ address: ticketAddress })
  const POWER: any = decimals != undefined ? BigNumber.from(10).pow(decimals) : BigNumber.from(10).pow(6)

  const [withdrawAmount, setWithdrawAmount] = React.useState('')
  const debouncedWithdrawAmount = useDebounce(Number(withdrawAmount) * POWER, 500)

  // @ts-ignore
  const { data, write: withdrawToken } = usePoolTogetherPrizePoolWithdrawFrom({
    address: prizePoolAddress,
    args: [address, debouncedWithdrawAmount],
    enabled: Boolean(debouncedWithdrawAmount),
    overrides: {
      gasLimit: BigNumber.from(750000),
    },
  })

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })
  const handleSubmit = (event: any) => {
    event.preventDefault()
    withdrawToken?.()
  }

  const handleChange = (event: any) => {
    const value = event.target.value
    const regex = /^[0-9]*\.?[0-9]*$/
    if (regex.test(value)) {
      setWithdrawAmount(value)
    }
  }

  return (
    <>
      <Form.Root className="FormRoot" onSubmit={handleSubmit}>
        <Form.Field className="FormField" name="amountWithdraw">
          <div className="flex justify-between align-baseline">
            <Form.Label className="FormLabel mb-2">Amount </Form.Label>
            <Form.Label className="FormLabel mb-2">
              <a className="ml-10 cursor-pointer hover:underline" onClick={() => setWithdrawAmount(userBalance.toString())}>
                {parseFloat(userBalance.toString()).toFixed(2)} USDC
              </a>
            </Form.Label>
          </div>
          <Form.Control asChild>
            <input
              className="input"
              value={Number(withdrawAmount) < userBalance ? withdrawAmount : userBalance}
              onChange={(e) => handleChange(e)}
              type="text"
              required={true}
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <div className="mt-4 flex justify-center">
            <button
              disabled={prizePoolAddress == undefined && (!withdrawToken || isLoading)}
              className={
                prizePoolAddress == undefined || debouncedWithdrawAmount == 0
                  ? 'btn btn-emerald btn-sm cursor-not-allowed opacity-50'
                  : 'btn btn-emerald btn-sm'
              }>
              {prizePoolAddress == undefined ? 'Please switch network' : isLoading ? 'Processing...' : 'Withdraw'}
            </button>
          </div>
        </Form.Submit>
      </Form.Root>
    </>
  )
}
