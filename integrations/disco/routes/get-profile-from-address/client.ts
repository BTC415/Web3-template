import axios from 'axios'
import type { Address } from 'wagmi'

export async function appDiscoGetProfileFromAddress(address?: Address): Promise<any> {
  try {
    const { data } = await axios.get(`/api/disco/profile-from-address`, {
      params: {
        address: address,
      },
    })
    return data
  } catch (error) {
    throw error
  }
}
