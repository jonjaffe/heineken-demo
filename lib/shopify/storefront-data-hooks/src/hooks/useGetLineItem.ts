import { useCartItems } from './useCartItems'

export function useGetLineItem() {
  const cartItems = useCartItems()

  // @ts-ignore next-line
  function getLineItem(variantId: string | number): ShopifyBuy.LineItem | null {
    if (cartItems.length < 1) {
      return null
    }


    // @ts-ignore next-line
    const item = cartItems.find((cartItem) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return cartItem.variant.id === variantId
    })

    if (item == null) {
      return null
    }

    return item
  }

  return getLineItem
}
