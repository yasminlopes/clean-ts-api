import { AccountModel } from '../../../domain/models/account'
import {
  AddAccount,
  AddAccountModel
} from '../../../domain/usecases/add-account'
import { Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  private readonly _encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this._encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this._encrypter.encrypt(account.password)
    return new Promise(resolve => resolve(null))
  }
}
