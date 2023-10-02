import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/helpers/mongo-helper'

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST / signup', () => {
    test('should return 200 on sign up', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Yasmin Lopes',
          email: 'yasmin.lopesx27@gmail.com',
          password: 'password',
          passwordConfirmation: 'password'
        })
        .expect(200)
    })
  })
})
