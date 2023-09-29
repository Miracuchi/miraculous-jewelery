import { type Category } from './categories'

export interface Ad {
  id: number
  title: string
  description: string
  owner: string
  price: number
  location: string
  picture: string
  createdAt: Date
  category: Category
}

export interface IAdCard
  extends Omit<
  Ad,
  | 'tags'
  | 'category'
  | 'updatedAt'
  | 'description'
  | 'owner'
  | 'location'
  | 'createdAt'
  > {}

export interface IAdForm
  extends Omit<Ad>, 'createdAt' {
  description: string | number | readonly string[] | undefined
  owner: string | number | readonly string[] | undefined
  price: string | number | readonly string[] | undefined
  location: string | number | readonly string[] | undefined
  title: string | number | readonly string[] | undefined
  picture: string | number | readonly string[] | undefined
  id?: number | undefined
  category?: Omit<Category, 'name'>
}

export interface FormEditOrCreate {
  initialData?: Ad
}
