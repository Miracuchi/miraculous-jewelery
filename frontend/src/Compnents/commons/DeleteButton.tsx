// import axiosInstance from '@/lib/axiosInstance'
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { type Ad, type IAdForm, type FormEditOrCreate } from '@/types/ads'
// import { type Category } from '@/types/categories'
// import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'
// interface IError {
//   field: string | null
//   message: string
// }

// function DeleteAd (): JSX.Element {
//   const router = useRouter()
//   const [errors, setErrors] = useState<IError[]>({} as IAdForm)

//   const handleDelete = (e: React.ChangeEvent<HTMLFormElement>) => {
//     axiosInstance
//       .delete(`/ads/delete/${router.query.id}`)
//       .then(({ data }) => {
//         router.push
//       })
//   }
//   return
//         <div></div>
// }

// export default Delete
