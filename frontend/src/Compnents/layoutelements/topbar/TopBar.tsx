import Image from 'next/image'
import SearchBar from './SearchBar'
import Link from 'next/link'
import styles from '@/styles/topbar/Topbar.module.css'

function TopBar (): JSX.Element {
  return (
        <nav className={styles.topbar}>
            <div>
                <Image
                    src="/logo.svg"
                    width={50}
                    height={50}
                    alt='The-Good-Corner'
                />
            </div>
            <div className={styles.inputSearch}>
                <SearchBar />
            </div>
            <Link href={'/ads/create'} className={styles.addAdButton}>Add an Ad</Link>
            <Link href={'/ads/admin'} className={styles.addAdButton}>Administration</Link>
        </nav>
  )
}

export default TopBar
