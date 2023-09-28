import { InvalidParamError } from '../../errors'
import { EmailValidator } from '../../protocols'
import { Validation } from './validation-helper'

export class EmailValidation implements Validation {
  private readonly _fieldName: string
  private readonly _emailValidator: EmailValidator

  constructor (fieldName: string, emailValidator: EmailValidator) {
    this._fieldName = fieldName
    this._emailValidator = emailValidator
  }

  validate (input: any): Error {
    const isValid = this._emailValidator.isValid(input[this._fieldName])
    if (!isValid) {
      return new InvalidParamError(this._fieldName)
    }
  }
}
