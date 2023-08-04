import { AddAccount } from '../../domain/usecases/add-account'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { HttpResponse, HttpRequest, Controller, EmailValidator } from '../protocols'

export class SignUpController implements Controller {
  private readonly _emailValidator: EmailValidator
  private readonly _addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this._emailValidator = emailValidator
    this._addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]

      const { name, email, password, passwordConfirmation } = httpRequest.body

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this._emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      this._addAccount.add({ name, email, password })
    } catch (error) {
      return serverError()
    }

    return {
      statusCode: 200,
      body: 'Success'
    }
  }
}
