import { DataSource } from 'typeorm'

export default new DataSource({
  type: 'sqlite',
  database: 'miraculous_jewelry.sqlite',
  entities: ['src/entities/*.ts'],
  synchronize: true,
  logging: true
})
