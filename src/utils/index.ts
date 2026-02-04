import type { Account } from '@/types'

export const defaultAccount = (): Account => {
  return { id: crypto.randomUUID(), tag: '', type: 'local', login: '', password: '' }
}
