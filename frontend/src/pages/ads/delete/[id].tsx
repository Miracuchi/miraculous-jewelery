import axiosInstance from '@/lib/axiosInstance'
// import { type Ad } from '@/types/ads'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
interface IError {
  field: string | null
  message: string
}

function ViewDelete (): JSX.Element {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errors, setErrors] = useState<IError[]>([] as IError[])
  const adminAdsLink = '/ads/admin'

  const handleDelete = (): void => {
    axiosInstance
      .delete(`/ads/delete/${router.query.id}`)
      .then(({ data }) => {
        router.push(adminAdsLink)
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
        setErrors(err.response.data?.errors)
      })
  }

  return (
    <div>
      <p>Voulez-vous supprimer définitivement cet article ?</p>
      <button onClick={handleDelete}>Supprimer définitivement</button>
      <button><Link href={adminAdsLink}>Annuler</Link></button>
    </div>
  )
}

export default ViewDelete
