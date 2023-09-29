/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import axiosInstance from '@/lib/axiosInstance'
import { formatAmount } from '@/lib/utilities'
import { type Ad } from '@/types/ads'
import { type Category } from '@/types/categories'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function AdminAds (): React.JSX.Element {
  const [categoriesValue, setCategoriesValue] = useState<Category[]>([])
  const [filter, setFilter] = useState<number>()
  const [ads, setAds] = useState<Ad[]>([])

  useEffect(() => {
    axiosInstance
      .get<Category[]>('/categories/list', {})
      .then(({ data }) =>
        setCategoriesValue(data)
      )
  }, [])

  useEffect(() => {
    if (categoriesValue.length) {
      setFilter(categoriesValue[0].id)
    }
  }, [categoriesValue])

  useEffect(() => {
    if (filter) {
      console.log('aller chercher les annonce de ' + filter)
      axiosInstance
        .get<Ad[]>(`/ads/listByCategory/${filter}`)
        .then(({ data }) => setAds(data))
        .catch((error) => { console.log(error) })
    }
  }, [filter])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setFilter(+e.target.value)
  }

  return (
    <div>
      <div>
        {categoriesValue.length && (
          <>
            Filtre:
            <select

              onChange={handleChange}
              name="category"
              value={filter}
            >
              {categoriesValue.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
      <div>Liste des annonces:
        {ads.length
          ? (
          <table>
            <thead>
              <tr>Titre</tr>
              <tr>Prix</tr>
              <tr>Action</tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad.id}>
                  <td>{ad.title}</td>
                  <td>{formatAmount(ad.price)}</td>
                  <td>
                    <Link href={`/ads/edit/${ad.id}`}>Editer</Link>
                    <Link href={`/ads/delete/${ad.id}`}>Supprimer</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            )
          : (
          <div>Aucune anonce dans cette Catégorie</div>
            )}
      </div>
    </div>
  )
}

export default AdminAds
