import { useContext } from 'react'
import { Context } from '../Context'

export function useCartItems() {
  const { cart } = useContext(Context)
  // @ts-ignore next-line
  if (!cart || !Array.isArray(cart.lineItems)) {
    return []
  }

  // @ts-ignore next-line
  return cart.lineItems
}
