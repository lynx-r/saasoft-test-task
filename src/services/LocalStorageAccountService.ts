import { ACCOUNTS_STORAGE_KEY } from '@/constants/account'
import { mapAccountsToString, mapStringToAccounts } from '@/mappers/account'
import type { Account } from '@/types/account'
import type { ArrayResponse } from '@/types/api'
import { emptyAccount } from '@/utils/account'
import type { AccountsService } from './AccountsService'

export class LocalStorageAccountService implements AccountsService {
  async getAccounts(first?: number, last?: number): Promise<ArrayResponse<Account>> {
    const accountsStr = localStorage.getItem(ACCOUNTS_STORAGE_KEY)
    if (!accountsStr) {
      return { data: [], totalCount: 0 }
    }
    const accounts = mapStringToAccounts(accountsStr)
    if (first !== undefined && last !== undefined) {
      const data = accounts.slice(first, last)
      return { data, totalCount: accounts.length }
    }
    await new Promise((resolve) => setTimeout(() => resolve(true), 500))
    return { data: accounts, totalCount: accounts.length }
  }

  async getAccountsTotalCount(): Promise<number> {
    const { totalCount } = await this.getAccounts()
    return totalCount
  }

  async createEmptyAccount(): Promise<Account> {
    const { data: accounts } = await this.getAccounts()
    const account = emptyAccount()
    const newAccounts = [account, ...accounts]
    localStorage.setItem('accounts', mapAccountsToString(newAccounts))
    return account
  }

  async updateAccount(id: string, account: Account): Promise<Account> {
    const { data: accounts } = await this.getAccounts()
    const newAccounts = accounts.map((acc) => (acc.id === id ? account : acc))
    localStorage.setItem('accounts', mapAccountsToString(newAccounts))
    return account
  }

  async deleteAccount(id: string): Promise<void> {
    const { data: accounts } = await this.getAccounts()
    const newAccounts = accounts.filter((acc) => acc.id !== id)
    localStorage.setItem('accounts', mapAccountsToString(newAccounts))
  }
}
