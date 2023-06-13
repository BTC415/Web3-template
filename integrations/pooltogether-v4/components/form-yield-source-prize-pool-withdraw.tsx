import { ChangeEvent, FormEvent, useState } from 'react'

import * as Form from '@radix-ui/react-form'
import { useDebounce } from 'usehooks-ts'
import { parseUnits } from 'viem'
import { useAccount, useWaitForTransaction } from 'wagmi'

import { useLoadContractFromChainId } from '@/actions/pooltogether-v4/hooks/use-load-contract-from-chain-id'
import { useUserBalanceWithdraw } from '@/actions/pooltogether-v4/hooks/use-user-balance-withdraw'
import { PRIZE_POOL_CONTRACT } from '@/actions/pooltogether-v4/utils/prize-pool-contract-list'
import { TICKET_CONTRACT } from '@/actions/pooltogether-v4/utils/ticket-contract-list'
import { usePoolTogetherPrizePoolWithdrawFrom } from '@/integrations/pooltogether-v4/generated/pooltogether-v4-wagmi'
import { useErc20Decimals } from '@/lib/generated/blockchain'

export function PoolTogetherFormWithdraw() {
  const { address } = useAccount()
  const userBalance = useUserBalanceWithdraw()
  const prizePoolAddress = useLoadContractFromChainId(PRIZE_POOL_CONTRACT)
  const ticketAddress = useLoadContractFromChainId(TICKET_CONTRACT)

  const { data: decimals } = useErc20Decimals({ address: ticketAddress })

  const POWER = decimals ?? 6

  const [withdrawAmount, setWithdrawAmount] = useState<number>()

  const debouncedWithdrawAmount = useDebounce(withdrawAmount != undefined ? parseUnits(`${withdrawAmount}`, POWER) : BigInt(0), 500)

  const { data, write: withdrawToken } = usePoolTogetherPrizePoolWithdrawFrom({
    address: prizePoolAddress,
    args: [address || '0x0', debouncedWithdrawAmount],
  })

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  })
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    withdrawToken?.()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value != '' ? parseFloat(event.target.valueAsNumber.toFixed(decimals)) : undefined
    setWithdrawAmount(value)
  }

  return (
    <>
      <Form.Root onSubmit={handleSubmit}>
        <Form.Field name="amountWithdraw">
          <div className="flex justify-between align-baseline">
            <Form.Label className="mb-2">Amount </Form.Label>
            <Form.Label className="mb-2">
              <span className="ml-10 cursor-pointer hover:underline" onClick={() => setWithdrawAmount(userBalance)}>
                {parseFloat(userBalance.toString()).toFixed(2)} USDC
              </span>
            </Form.Label>
          </div>
          <Form.Control asChild>
            <input
              className="input"
              value={withdrawAmount != undefined && withdrawAmount > userBalance ? userBalance : withdrawAmount}
              onChange={handleChange}
              type="number"
              min={0}
              max={userBalance}
              step={'any'}
              required={true}
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <div className="mt-4 flex justify-center">
            <button
              disabled={prizePoolAddress == undefined && (!withdrawToken || isLoading)}
              className={
                !prizePoolAddress || !debouncedWithdrawAmount ? 'btn btn-emerald btn-sm cursor-not-allowed opacity-50' : 'btn btn-emerald btn-sm'
              }>
              {prizePoolAddress == undefined ? 'Please switch network' : isLoading ? 'Processing...' : 'Withdraw'}
            </button>
          </div>
        </Form.Submit>
      </Form.Root>
    </>
  )
}
