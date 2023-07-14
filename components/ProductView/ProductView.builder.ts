import { Builder } from '@builder.io/react';
import ProductView from './ProductView'

const isDemo = Boolean(process.env.IS_DEMO)


export const ProductsListBuilderConfig = {
  name: 'ProductBox',
  inputs: [
    {
      name: 'product',
      type: `${isDemo ? 'ShopifyStore' : 'Shopify'}ProductHandle`,
    },
    {
      name: 'description',
      richText: true,
      type: 'html',
      helperText: 'Override product description from shopify',
    },
    {
      name: 'title',
      type: 'text',
      helperText: 'Override product title from shopify',
    },
  ],
  image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/ereader.svg',
  description: 'Choose a product to show its details on page',
}

Builder.registerComponent(ProductView, ProductsListBuilderConfig);
