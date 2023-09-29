import Link from 'next/link'

import { type Category } from '@/types/categories'
import ActiveLink from '../commons/ActiveLinks'
import styles from '@/styles/topbar/CategoriesBar.module.css'

const data: Category[] = [
  {
    id: 1,
    name: 'Chaussure'
  },
  {
    id: 2,
    name: 'Vetement'
  },
  {
    id: 3,
    name: 'Bijoux'
  },
  {
    id: 4,
    name: 'Informatique'
  }

]

// function CategoriesBar (): JSX.Element {
//   return <div className={style.categoriesBloc}>
//     {data.map((category) =>

//       <Link href={`/categories/view/${category.id}`}key={category.id} className={style.categoriesBlocText}>{category.name}</Link>)}

//   </div>
// }

function CategoriesBar (): JSX.Element {
  return (
    <div className={styles.categoriesBloc}>
      {data.map((category) => (
        <ActiveLink
          key={category.id}
          href={`/categories/view/${category.id}`}
          className={styles.linkCategoriesBar}
          activeClassName={styles.active}
        >
          {category.name}
        </ActiveLink>
      ))}
      <Link href="/categories/list">Voir plus...</Link>
    </div>
  )
}

export default CategoriesBar
