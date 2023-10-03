/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axiosInstance from '@/lib/axiosInstance'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Ad, type IAdForm, type FormEditOrCreate } from '@/types/ads'
import { type Category } from '@/types/categories'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface IError {
  field: string | null
  message: string
}

function Form ({ initialData }: FormEditOrCreate): React.JSX.Element {
  const router = useRouter()
  const [categoriesValue, setCategoriesValue] = useState<Category[]>([])
  const [formulaireData, setFormulaireData] = useState<IAdForm>({} as IAdForm)
  // asserssion pour typer
  const [errors, setErrors] = useState<IError[]>([] as IError[])

  useEffect(() => {
    axiosInstance
      .get<Category[]>('/categories/list', {})
      .then(({ data }) => { setCategoriesValue(data) })
      .catch((err) => {
        console.log(err)
      })

    if (initialData) {
      setFormulaireData(initialData)
    }
  }, [])

  // il faut utiliser un useEffect pour afficher le console log car les set ne sont pas bloquant
  useEffect(() => {
    console.log('2: use effect', formulaireData)
  }, [formulaireData])

  //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //     setFormulaireData({ ...formulaireData, [title]: { name: e.target.value } })
  //     console.log('les input', formulaireData)
  // if (inputType === 'text') {
  //   console.log('input text')
  // } else {
  //   console.log('select')
  //   setFormulaireData({ ...formulaireData, category: { id: +e.target.value } })
  //   // categorie est donc bien un objet avec l'id
  //   console.log('1: sans useeffect', formulaireData)
  // }

  const handleChange = (
    e:
    | React.ChangeEvent<HTMLSelectElement>
    | React.ChangeEvent<HTMLInputElement>
  ) => {
    let value: number | string | { id: number } = ''
    switch (e.target.name) {
      case 'category':
        value = { id: +e.target.value }
        break
      case 'price':
        value = +e.target.value
        break
      default:
        value = e.target.value
    }
    console.log(value)
    // const data =
    //   e.target.name === "category" ? { id: +e.target.value } : e.target.value; //cas particulier au cas où on est dans le select
    setFormulaireData({ ...formulaireData, [e.target.name]: value }) // {...formulaireData, title: valeur}
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!initialData) {
      axiosInstance
        .post('/ads/create', formulaireData)
        .then(({ data }) => {
          router.push(`/categories/view/${data.category?.id}`)
          console.log(data)
        })
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        .catch((err) => {
          console.log(err)
          setErrors(err.response.data?.errors)
        })
    } else {
      axiosInstance
        .patch(`/ads/update/${initialData.id}`, formulaireData)
        .then(({ data }) => {
          router.push(`/categories/view/${data.category?.id}`)
        })
        .catch((err) => {
          console.log(err)
          setErrors(err.response.data?.errors)
        })
    }
  }

  const getError = (field: string) => {
    let errorText = ''
    if (errors.length) {
      const error = errors.find((e) => e.field === field)
      if (error) {
        errorText = error.message
      }
    }

    return errorText
  }

  return (
        <div>
          <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder="titre" name='title' onChange={handleChange} value={formulaireData.title}/>
            <span>{getError('title')}</span>
            <input type="text" placeholder="description" name='description' onChange={handleChange} value={formulaireData.description}/>
            <input type="text" placeholder="owner" name='owner' onChange={handleChange} value={formulaireData.owner}/>
            <input type="number" placeholder="price" name='price' step='any' onChange={handleChange} value={formulaireData.price}/>
            <span>{getError('price')}</span>
            <input type="text" placeholder="location" name='location' onChange={handleChange} value={formulaireData.location}/>
            <input type="text" placeholder="picture" name='picture' onChange={handleChange} value={formulaireData.picture}/>
            <select name="category" onChange={handleChange} value={formulaireData.category?.id}>
                <option>Choisissez une Catégorie</option>
                {categoriesValue.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <button type='submit'>{initialData ? "Editer l'annonce" : "Ajouter l'annonce"}</button>
          </form>
        </div>
  )
}

export default Form
