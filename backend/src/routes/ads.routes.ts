/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Router, type Request, type Response } from 'express'
import { Ad } from '../entities/ad.entity'
import { In } from 'typeorm'
import AdsService from '../services/ads.service'
import CategoryService from '../services/category.service'
import { IAdForm } from '../types/ad'
import { formatedErrors } from '../lib/utilities'
const router = Router()

router.get('/find/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  console.log('ID', id)
  try {
    const ad = await new AdsService().find(+id)
    if (!ad) {
      throw new Error('Pas dannonce')
    }
    res.json(ad)
  } catch (err: any) {
    console.log(err)
    // res.sendStatus(500)
    res.json(formatedErrors(err))
  }
})

router.get('/list', async (req: Request, res: Response) => {
  const { tagIds } = req.query
  try {
    const ads = await Ad.find({
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
    res.send(ads)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})
router.get('/listbycategory/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  console.log('params', id)
  const category = await new CategoryService().find(+id)
  if (category === null) {
    throw new Error("La catégory n'existe pas")
  }
  try {
    const ads = await new AdsService().listByCategory(+id)
    res.send(ads)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.post('/create', async (req: Request, res: Response) => {
  try {
    const { price, ...data }: IAdForm = req.body
    const newAd = await new AdsService().create({ ...data, price: +price })
    res.send(newAd)
  } catch (err: any) {
    console.log(err)
    res.status(500).json(formatedErrors(err))
  }
})

router.delete('/delete/:id', async (req: Request, res: Response) => {
  try {
    const adToDelete = await Ad.findOneBy({ id: parseInt(req.params.id, 10) })
    if (adToDelete === null) return res.sendStatus(404)
    await adToDelete.remove()
    res.sendStatus(204)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})
/** ========================================================================
 *                           liste des routes ...
 *========================================================================**/

router.patch('/update/:id', async (req: Request, res: Response) => {
  try {
    const data: IAdForm = req.body
    const { id } = req.params
    const adToUpdate = await new AdsService().update(+id, data)
    res.send(adToUpdate)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

export default router
