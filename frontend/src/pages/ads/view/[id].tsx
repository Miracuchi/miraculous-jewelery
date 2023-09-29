import SheetAd from '@/Compnents/ads/SheetAd'
import axiosInstance from '@/lib/axiosInstance'
import { type Ad } from '@/types/ads'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface IError {
  // à mettre dans un autre fichier
  field: string | null
  message: string
}

function ViewAd (): JSX.Element {
  const router = useRouter()
  const [ad, setAd] = useState<Ad>()
  const [loading, setLoading] = useState<boolean>(true)
  const [errors, setErrors] = useState<IError[]>([])

  useEffect(() => {
    if (router.query.id) {
      axiosInstance
        .get<Ad>(`/ads/find/${router.query.id}`)
        .then(({ data }) => {
          setAd(data)
          console.log(data)
          setLoading(false)
        })
        .catch((err: any) => {
          console.log('ERREUR RECUE ', err.response.data.errors)
          setErrors(err.response.data?.errors)
          setLoading(false)
        })
    }
  }, [router.query.id])

  if (errors.length) {
    return (
      <ul>
        {errors.map((e, i) => (
          <li key={i}>{e.message}</li>
        ))}
      </ul>
    )
  }

  if (loading) {
    return <div>Chargement</div>
  }
  return (<div>
    {ad
      ? (
      <>
      <SheetAd {...ad} />
      {/* <div>Titre: {ad?.title}</div>
    <div>Description: {ad?.description}</div>
    <div>Prix: {ad?.price}</div> */}
    </>)
      : (<div>lannonce nexiste pas</div>)}
  </div>)
}

export default ViewAd
