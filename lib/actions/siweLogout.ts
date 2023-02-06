import axios, { AxiosError } from 'axios'

import { siteConfig } from '@/config/site'

export async function siweLogout(): Promise<boolean> {
  try {
    await axios.get('/api/account/logout')
    // @TODO: This is a hack to remove the cookie from the browser
    //        This should be done with the cookieOptions.httpOnly = true
    //        but that is not working. This is a workaround until
    //        the issue is resolved. See:
    //        /api/account/logout
    document.cookie = `${siteConfig.name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    return true
  } catch (error: any) {
    if (error instanceof AxiosError == true) {
      return false
    }
    throw new Error(`Unexpected Error`)
  }
}
