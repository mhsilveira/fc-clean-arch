import ProductFactory from '../../../domain/product/factory/product.factory'
import UpdateProductUseCase from './update.product.usecase'

const product = ProductFactory.create('a', 'Iphone XR', 600)

const input = {
  id: product.id,
  name: 'Iphone 11',
  price: 900,
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn()
  }
}

describe('Unit test for product update use case', () => {
  it('should update a product', async () => {
    const productRepository = MockRepository()
    const productUpdateUseCase = new UpdateProductUseCase(productRepository)

    const output = await productUpdateUseCase.execute(input)

    expect(output).toEqual(input)
  })
})