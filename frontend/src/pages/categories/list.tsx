// import React from 'react'
import { type Category } from '@/types/categories'
import { useEffect, useState } from 'react'
import Card from '@/Compnents/categorie/Card'
import styles from '@/styles/Categories.module.css'
import axiosInstance from '@/lib/axiosInstance'

function Categories (): JSX.Element {
  console.log(axiosInstance)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    axiosInstance
      .get<Category[]>('/categories/list')
      .then(({ data }) => { setCategories(data) })
  }, [])

  return (
    <div>
      <h1>Liste des catégories</h1>
      <div className={styles.cardBloc}>
        {categories.map((c) => (
          <Card key={c.id} id={c.id} name={c.name} />
        ))}
      </div>
    </div>
  )
}

// Categories.getLayout = function getLayout (page: any) {
// return (
//   <div>
//     <h1>Liste</h1>
//     <nav>Navbar</nav>
//     {page}
//     <footer>Footer</footer>
//   </div>
// )
// }

/** ========================================================================
 *                           Méthode avec le rendu côté serveur
 *========================================================================**/
// export const getServerSideProps = async () => {
//   const { data } = await axios.get<Category[]>(
//     "http://localhost:4000/categories/list"
//   );
//   return { props: { data, maValeur: "toto" } };
// };
export default Categories
