import { NextApiRequest, NextApiResponse } from 'next'

import { withSessionRoute } from '../../../lib/server'

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.send({ address: req.session.siwe?.address })
  }

  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
})
