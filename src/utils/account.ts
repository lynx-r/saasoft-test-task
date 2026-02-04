import type { Account } from '@/types'

export const emptyAccount = (): Account => {
  return { id: crypto.randomUUID(), tag: '', type: 'local', login: '', password: '' }
}
