import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import ProductFactory from '../../../domain/product/factory/product.factory'
import {
  InputCreateProductDto,
  OutputCreateProductDto
} from './create.product.dto'

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface

  constructor (productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute (
    productInput: InputCreateProductDto
  ): Promise<OutputCreateProductDto> {
    const { type, name, price } = productInput
    const product = ProductFactory.create(type, name, price)

    await this.productRepository.create(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
