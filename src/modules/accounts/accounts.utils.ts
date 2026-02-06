import type { Account } from '@/modules/accounts/accounts.types'

export const emptyAccount = (): Account => {
  return { id: crypto.randomUUID(), tag: '', type: 'local', login: '', password: '' }
}
