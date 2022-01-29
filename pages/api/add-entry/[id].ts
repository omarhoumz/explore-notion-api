import type { NextApiRequest, NextApiResponse } from 'next'

import notion from '../../../src/notion-client'

async function addItem(text: string, databaseId: string) {
  try {
    const args = {
      parent: { database_id: databaseId },
      properties: {
        title: {
          title: [{ text: { content: text } }],
        },
      },
    }
    await notion.pages.create(args)
  } catch (error) {
    console.error(error.body)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id: databaseId } = req.query as { id: string }
  const text = req.body.text

  if (text) {
    await addItem(text, databaseId)
  }

  res.status(200).json({ name: 'Jane Do' })
}
