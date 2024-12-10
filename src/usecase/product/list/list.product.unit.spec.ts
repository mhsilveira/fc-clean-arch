import ProductFactory from '../../../domain/product/factory/product.factory'
import ListProductUseCase from './list.product.usecase'

const product1 = ProductFactory.create('a', 'Gameboy Color', 350)

const product2 = ProductFactory.create('b', 'Shiny Gameboy Color', 350)

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2]))
  }
}

describe('Unit test for listing products', () => {
  it('should list given products', async () => {
    const repository = MockRepository()
    const useCase = new ListProductUseCase(repository)

    const output = await useCase.execute({})

    expect(output.products.length).toBe(2)
    expect(output.products[0].id).toBe(product1.id)
    expect(output.products[0].name).toBe(product1.name)
    expect(output.products[1].id).toBe(product2.id)
    expect(output.products[1].name).toBe(product2.name)
  })
})