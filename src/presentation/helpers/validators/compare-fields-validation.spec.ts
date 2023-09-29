import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

interface SutTypes {
  sut: CompareFieldsValidation
}

const makeSut = (): SutTypes => {
  const sut = new CompareFieldsValidation('field', 'fieldToCompare')
  return {
    sut
  }
}

describe('CompareFieldsValidation Validation', () => {
  test('should return a InvalidParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'any_other_value' })

    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'any_value' })

    expect(error).toBeFalsy()
  })
})
