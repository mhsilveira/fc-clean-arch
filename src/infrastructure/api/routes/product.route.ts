import express, { Request, Response } from 'express'
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase'
import ProductRepository from '../../product/repository/sequelize/product.repository'
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase'

export const productRoute = express.Router()

productRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository())
  const { name, price, type } = req.body
  try {
    const productPayload = {
      type,
      name,
      price
    }
    const output = await usecase.execute(productPayload)
    res.send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})

productRoute.get('/', async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository())

  try {
    const output = await usecase.execute()
    res.status(200).send(output) // Incluí o status 200 explicitamente.
  } catch (err) {
    res.status(500).send(err)
  }
})
