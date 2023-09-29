import { type Ad } from '@/types/ads'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AdCard from '@/Compnents/ads/Card'
import axiosInstance from '@/lib/axiosInstance'

function ViewCategory (): JSX.Element {
  const router = useRouter()
  const [ads, setAds] = useState<Ad[]>([])

  useEffect(() => {
    if (router.query.id) {
      axiosInstance
        .get<Ad[]>(`/ads/listbycategory/${router.query.id}`)
        .then(({ data }) => {
          console.log(data)
          setAds(data)
        })
    }
  }, [router.query.id])

  /** ======================
   *    conditions plus complexes qu'un ternaire
   *========================**/
  // const monexemple = () => {
  //   let result = <></>;
  //   if (ads.length > 0) {
  //     result = <div>Tiens j'ai des annonces</div>;
  //   } else {
  //     result = <div>Il n'y a pas d'annonces</div>;
  //   }
  //   return result;
  // };

  return (
    <div>
      Visualisation de la catégorie ayant id : {router.query.id}
      <div>
        {/* {monexemple()} */}
        {/* // {ads.length ? ( */}
        {ads.length > 0
          ? (ads.map((a) => (
            <AdCard
              key={a.id}
              id={a.id}
              picture={a.picture}
              price={a.price}
              title={a.title}
            />
            ))
            )
          : (
          <div>Revenez plus tard, pas dannonces pour linstant</div>
            )}
      </div>
    </div>
  )
}

export default ViewCategory
