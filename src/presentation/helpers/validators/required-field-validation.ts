import { MissingParamError } from '../../errors'
import { Validation } from './validation-helper'

export class RequiredFieldValidation implements Validation {
  private readonly _fieldName: string

  constructor (fieldName: string) {
    this._fieldName = fieldName
  }

  validate (input: any): Error {
    if (!input[this._fieldName]) {
      return new MissingParamError(this._fieldName)
    }
  }
}
