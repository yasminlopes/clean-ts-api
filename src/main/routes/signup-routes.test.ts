import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('should return account on success', async () => {
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
