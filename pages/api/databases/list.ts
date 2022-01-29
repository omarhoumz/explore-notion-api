import type { NextApiRequest, NextApiResponse } from 'next'

import notion from '../../../src/notion-client'

function formatDbList(results) {
  return results.map(({ url, id, cover, icon, title, last_edited_time }) => {
    return {
      title: title[0].plain_text,
      lastEdited: last_edited_time,
      url,
      id,
      cover,
      icon,
    }
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let response = await notion.search({
    filter: { property: 'object', value: 'database' },
  })

  response.results = formatDbList(response.results)

  res.status(200).json(response)
}
