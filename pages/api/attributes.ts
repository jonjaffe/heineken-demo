// import { getAttributes } from '@builder.io/personalization-context-menu'
import { NextApiRequest, NextApiResponse } from 'next'

if (!process.env.BUILDER_PRIVATE_KEY) {
  throw new Error('No BUILDER_PRIVATE_KEY defined')
}

/**
 * API to get the custom targeting attributes from Builder, only needed for the context menu to show a configurator and allow toggling of attributes
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const attributes = await getAttributes(process.env.BUILDER_PRIVATE_KEY!)
  // TODO: Admin SDK not working properly in Next.js
  const result = await fetch('https://builder.io/api/v2/admin', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + process.env.BUILDER_PRIVATE_KEY,
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"operationName":null,"variables":{},"query":"{\n  settings\n  id\n  models {\n    id\n    name\n  }\n}\n"}),
    }).then((data) => data.json())
  const attributes = result.data?.settings.customTargetingAttributes
  res.send(attributes)
}