import { InvalidParamError } from '../../errors'
import { Validation } from './validation-helper'

export class CompareFieldsValidation implements Validation {
  private readonly _fieldName: string
  private readonly _fieldToCompareName: string

  constructor (fieldName: string, fieldToCompareName: string) {
    this._fieldName = fieldName
    this._fieldToCompareName = fieldToCompareName
  }

  validate (input: any): Error {
    if (!input[this._fieldName] !== input[this._fieldToCompareName]) {
      return new InvalidParamError(this._fieldToCompareName)
    }
  }
}
