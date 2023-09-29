import Button from '@/Compnents/Button'
import FindAds from '@/pages/ads/find'
import styles from '@/styles/topbar/SearchBar.module.css'

function SearchBar (): JSX.Element {
  return (

        <div className={styles.searchTruc}>
        <input type="text" placeholder='Rechercher' className={styles.inputSearchBar}/>
        <Button><FindAds /></Button>
        </div>

  )
}

export default SearchBar
