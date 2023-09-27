import { Validation } from './validation-helper'

export class ValidationComposite implements Validation {
  private readonly _validations: Validation[]

  constructor (validations: Validation[]) {
    this._validations = validations
  }

  validate (input: any): Error {
    for (const validation of this._validations) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
