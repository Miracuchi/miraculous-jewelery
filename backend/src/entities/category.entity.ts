import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm'
import { Ad } from './ad.entity'

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
  @Index({ unique: true })
    name: string

  @OneToMany(() => Ad, (ad) => ad.category)
    ads: Ad[]
}
