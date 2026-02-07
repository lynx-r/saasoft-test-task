import { type Account } from '@/modules/accounts/accounts.types'
import type { ArrayResponse } from '@/types/api'

export default interface AccountsService {
  getAccounts(first?: number, last?: number): Promise<ArrayResponse<Account>>
  getAccountsTotalCount(): Promise<number>
  createEmptyAccount(): Promise<Account>
  updateAccount(id: string, account: Account): Promise<Account>
  deleteAccount(id: string): Promise<void>
}
