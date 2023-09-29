import { type Ad } from '@/types/ads'
import { formatAmount } from '@/lib/utilities'

function SheetAd ({ title, price, description }: Ad): JSX.Element {
  console.log('prix', price)
  return (
        <>
            <div>{title}</div>
            <div>{formatAmount(price)}</div>
            <div>{description}</div>
        </>
  )
}
// intersection TS

export default SheetAd
