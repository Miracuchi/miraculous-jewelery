import styles from '@/styles/Card.module.css'
import { type IAdCard } from '@/types/ads'
import Link from 'next/link'

function Card ({ id, title, price, picture }: IAdCard): JSX.Element {
  return (

      <div className={styles.card}>
        <div className={styles.cardText}>{title}</div>
        <Link href={`/ads/view/${id}`}>
          <img src={picture} width={50} height={50}/>
        </Link>
        <div className={styles.cardText}>{price}</div>
        <button>Ajouter au panier</button>
      </div>

  )
}

export default Card
