import { type Account } from '@/types'
import type { ArrayResponse } from '@/types/Api'

export interface AccountsService {
  getAccounts(first?: number, last?: number): Promise<ArrayResponse<Account>>
  createEmptyAccount(): Promise<Account>
  updateAccount(id: string, account: Account): Promise<Account>
  deleteAccount(id: string): Promise<void>
}
