import type { AccountType } from '@/types/account'
import type { SelectOption } from '@/types/components'

export const ACCOUNT_OPTIONS: SelectOption<AccountType>[] = [
  { optionLabel: 'LDAP', optionValue: 'ldap' },
  { optionLabel: 'Локальная', optionValue: 'local' },
]

export const ACCOUNTS_STORAGE_KEY = 'accounts'
