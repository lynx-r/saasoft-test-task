import { type Account } from '@/types/account'
import type { ArrayResponse } from '@/types/api'

export interface AccountsService {
  getAccounts(first?: number, last?: number): Promise<ArrayResponse<Account>>
  getAccountsTotalCount(): Promise<number>
  createEmptyAccount(): Promise<Account>
  updateAccount(id: string, account: Account): Promise<Account>
  deleteAccount(id: string): Promise<void>
}
