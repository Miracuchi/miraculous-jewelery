/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState, useEffect } from 'react'
import { type Category } from '@/types/categories'
import axiosInstance from '@/lib/axiosInstance'

const schema = yup
  .object({
    title: yup.string().min(5).required('Le nom est requis'),
    description: yup.string(),
    owner: yup.string().required('Le créateur est requis'),
    price: yup.number().typeError('entrer un nombre').positive().required('Le prix est requis'),
    location: yup.string().required('La localisation est requis'),
    picture: yup.string().required('Limage est requis'),
    category: yup.number().typeError('indiquer une catégorie').required()
    // age: yup.number().positive().integer().required()
  })
  .required()

export default function FormReactHook
() {
  const [categories, setCategories] = useState<Category[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })
  const onSubmit = (data: any) => console.log('On submit', data)

  useEffect(() => {
    axiosInstance
      .get<Category[]>('/categories/list', {})
      .then(({ data }) => { setCategories(data) })
      .catch((err) => {
        console.log(err)
      })

    // if (initialData) {
    //   setFormulaireData(initialData);
    // }
  }, [])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title')} />
      <p>{errors.title?.message}</p>

      <input {...register('description')} />
      <p>{errors.description?.message}</p>

      <input {...register('owner')} />
      <p>{errors.owner?.message}</p>

      <input {...register('price')} />
      <p>{errors.price?.message}</p>

      <input {...register('picture')} />
      <p>{errors.picture?.message}</p>

      <input {...register('location')} />
      <p>{errors.location?.message}</p>

      <select {...register('category')}>
        <option>Choisissez une catégorie</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <p>{errors.category?.message}</p>

      <input type="submit" />
    </form>
  )
}
