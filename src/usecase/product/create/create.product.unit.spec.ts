import CreateProductUseCase from './create.product.usecase'
const productInputA = {
  name: 'Product A',
  type: 'a',
  price: 15
}

const wrongTypeProduct = {
  name: 'Product A',
  type: 'f',
  price: 50
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test create product use case', () => {
  it('should create a product', async () => {
    const productRepository = MockRepository()
    const productCreateUseCase = new CreateProductUseCase(productRepository)

    const output = await productCreateUseCase.execute(productInputA)

    expect(output).toEqual({
      id: expect.any(String),
      name: productInputA.name,
      price: productInputA.price
    })
  })

  it('should throw an error if type is missing', async () => {
    const productRepository = MockRepository()
    const productCreateUseCase = new CreateProductUseCase(productRepository)

    await expect(
      productCreateUseCase.execute(wrongTypeProduct)
    ).rejects.toThrow('Product type not supported')
  })
})
