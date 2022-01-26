import type { NextApiRequest, NextApiResponse } from 'next'

import { databaseId } from '../../src/config'
import notion from '../../src/notion-client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await notion.databases.query({ database_id: databaseId })

  res.status(200).json(response)
}
