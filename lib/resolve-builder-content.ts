import { builder } from '@builder.io/react'
// @ts-ignore next-line
import { getAsyncProps } from '@builder.io/utils'
import builderConfig from '@config/builder'
import shopifyConfig from '@config/shopify'
import {
  getCollection,
  getProduct,
} from './shopify/storefront-data-hooks/src/api/operations'
builder.init(builderConfig.apiKey)

export async function resolveBuilderContent(
  modelName: string,
  targetingAttributes?: any
) {
  let page = await builder
    .get(modelName, {
      userAttributes: targetingAttributes,
      includeRefs: true,
      cachebust: true,
    } as any)
    .toPromise()

  if (page) {
    return await getAsyncProps(page, {
      // @ts-ignore next-line
      async ProductGrid(props) {
        let products: any[] = []
        if (props.productsList) {
          const promises = props.productsList
            .map((entry: any) => entry.product)
            .filter((handle: string | undefined) => typeof handle === 'string')
            .map(
              async (handle: string) =>
              // @ts-ignore next-line
                await getProduct(shopifyConfig, { handle })
            )
          products = await Promise.all(promises)
        }
        return {
          // resolve the query as `products` for ssr
          // used for example in ProductGrid.tsx as initialProducts
          products,
        }
      },
      // @ts-ignore next-line
      async CollectionBox(props) {
        let collection = props.collection
        if (collection && typeof collection === 'string') {
          // @ts-ignore next-line
          collection = await getCollection(shopifyConfig, {
            handle: collection,
          })
        }
        return {
          collection,
        }
      },
      // @ts-ignore next-line
      async ProductBox(props) {
        let product = props.product
        if (product && typeof product === 'string') {
          // @ts-ignore next-line
          product = await getProduct(shopifyConfig, {
            handle: product,
          })
        }
        return {
          product,
        }
      },

      // @ts-ignore next-line
      async ProductCollectionGrid({ collection }) {
        if (collection && typeof collection === 'string') {
          // @ts-ignore next-line
          const { products } = await getCollection(shopifyConfig, {
            handle: collection,
          })
          return {
            products,
          }
        }
      },
    })
  }
  return null
}
