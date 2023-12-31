import { In, type Repository } from 'typeorm'
import { Ad } from '../entities/ad.entity'
import datasource from '../db'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { IAdForm } from '../types/ad'
import { validate } from 'class-validator'
import CategoryService from './category.service'
import { aggregateErrors } from '../lib/utilities'
// import AggregateError from 'aggregate-error'

export default class AdsService {
  db: Repository<Ad>
  constructor () {
    this.db = datasource.getRepository(Ad)
  }

  async listByCategory (id: number): Promise<Ad[]> {
    return await this.db.find({ where: { category: { id } }, order: { createdAt: 'DESC' } })
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async find (id: number) {
    const ad = await this.db.findOne({
      where: { id },
      relations: { category: true }
    })

    if (!ad) {
      // throw new Error();
      throw new AggregateError([{
        field: null,
        message: 'Lannonce nexiste pas'
      }])
    }
    return ad
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async create (data: IAdForm) {
    const newAd = this.db.create(data)
    const errors = await validate(newAd)

    if (errors.length !== 0) {
      console.log(errors)
      throw new AggregateError(aggregateErrors(errors))
    }
    const { category, ...rest } = { ...newAd }
    const categoryToLink = await new CategoryService().find(category?.id)
    if (!categoryToLink) {
      throw new Error("La catégorie n'existe pas!")
    }
    return await this.db.save({ ...rest, category: categoryToLink })
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async update (id: number, data: IAdForm) {
    const adToUpdate = await this.find(id)
    if (!adToUpdate) {
      throw new Error("L'annonce n'existe pas!")
    }
    const adToSave = this.db.merge(adToUpdate, data)
    const errors = await validate(adToSave)
    if (errors.length !== 0) {
      console.log(errors)
      throw new Error('il y a eu une erreur')
    }

    return await this.db.save(adToSave)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async list (tagIds: string) {
    return await this.db.find({
      relations: {
        category: true,
        tags: true
      },
      where: {
        tags: {
          id:
            typeof tagIds === 'string' && tagIds.length > 0
              ? In(tagIds.split(',').map((t) => parseInt(t, 10)))
              : undefined
        }
      }
    })
  }
}
