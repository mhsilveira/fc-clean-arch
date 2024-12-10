import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import { InputListProductDto, OutputListProductDto } from './list.product.dto'

export default class ListProductUseCase {
  private productRepository: ProductRepositoryInterface
  constructor (productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute (input: InputListProductDto): Promise<OutputListProductDto> {
    const getProducts = await this.productRepository.findAll()
    return { products: getProducts }
  }
}

// class OutputMapper {
//   static toOutput(customer: Customer[]): OutputListCustomerDto {
//     return {
//       customers: customer.map((customer) => ({
//         id: customer.id,
//         name: customer.name,
//         address: {
//           street: customer.Address.street,
//           number: customer.Address.number,
//           zip: customer.Address.zip,
//           city: customer.Address.city,
//         },
//       })),
//     };
//   }
// }
