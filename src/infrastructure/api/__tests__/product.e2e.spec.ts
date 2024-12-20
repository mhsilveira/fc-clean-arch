import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for product entity', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const response = await request(app).post('/product').send({
      type: 'a',
      name: 'The Paramour Sessions - Papa Roach Live',
      price: 150
    })
    expect(response.status).toBe(200)
  })

  it('should list all products', async () => {
    const product1Payload = {
      type: 'a',
      name: 'The Paramour Sessions - Papa Roach Live',
      price: 150
    }
    const product2Payload = {
      type: 'b',
      name: 'Avenged Sevenfold - Live in the LBC',
      price: 300
    }

    const [product1, product2] = await Promise.all([
      request(app).post('/product').send(product1Payload),
      request(app).post('/product').send(product2Payload)
    ])

    expect(product1.status).toBe(200)
    expect(product2.status).toBe(200)

    const listProducts = await request(app).get('/product').send()

    expect(listProducts.status).toBe(200)
    expect(listProducts.body.products.length).toBe(2)
    const firstProduct = listProducts.body.products[0]
    const secondProduct = listProducts.body.products[1]
    expect(firstProduct._name).toBe(product1Payload.name)
    expect(firstProduct._price).toBe(product1Payload.price)
    expect(secondProduct._name).toBe(product2Payload.name)
    expect(secondProduct._price).toBe(product2Payload.price * 2)
  })
})
