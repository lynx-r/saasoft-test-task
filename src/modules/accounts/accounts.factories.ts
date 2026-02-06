import type { Account } from './accounts.types'

export const emptyAccount = (): Account => {
  return { id: crypto.randomUUID(), tag: '', type: 'local', login: '', password: '' }
}
