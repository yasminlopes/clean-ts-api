import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
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

  describe('POST /login', () => {
    test('should return 200 on login', async () => {
      const password = await hash('password', 12)
      await accountCollection.insertOne({
        name: 'Yasmin',
        email: 'yasmin.lopesx27@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'yasmin.lopesx27@gmail.com',
          password: 'password'
        })
        .expect(200)
    })

    test('should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'yasmin.lopesx27@gmail.com',
          password: 'password'
        })
        .expect(401)
    })
  })
})
