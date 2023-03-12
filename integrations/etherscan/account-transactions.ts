import axios from 'axios'

import getChainIdApiKey from './utils/get-chain-id-api-key'
import getEtherscanClient from './utils/get-etherscan-client'
import handleErrorTypes from './utils/handle-error-types'
import handleEtherscanResponse from './utils/handle-etherscan-response'
import isClientConnected from './utils/is-client-connected'
import isValidAddress from './utils/is-valid-address'

export async function etherscanAccountTransactions(chainId: number | string, address: string, config: BlockPagination) {
  const client = getEtherscanClient(Number(chainId), 5000, getChainIdApiKey(chainId))
  if (!isClientConnected(client)) {
    throw new Error('Etherscan Client Not Connected')
  }
  if (!isValidAddress(address)) throw new Error('Address Invalid')
  try {
    const { data } = await client.get('/api?', {
      params: {
        module: 'account',
        action: 'txlist',
        address,
        startblock: config.startblock || 0,
        endblock: config.endblock || 9999999999,
        sort: config.sort || 'asc',
        page: config.page || 1,
        offset: config.offset || 0,
      },
    })
    return handleEtherscanResponse(data)
  } catch (error) {
    return handleErrorTypes(error)
  }
}

export async function appEtherscanAccountTransactions(params?: BlockPagination): Promise<
  | {
      address: string
      transactions: Array<any>
    }
  | undefined
  | void
> {
  try {
    const { data } = await axios.get('/api/etherscan/account/transactions', {
      params: params,
    })
    return data
  } catch (error: any) {
    throw new Error(`Unexpected Error`)
  }
}
