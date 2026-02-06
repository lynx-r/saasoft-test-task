import type { AccountType } from '@/modules/accounts/accounts.types'
import type { SelectOption } from '@/types/components'

export const ACCOUNT_OPTIONS: SelectOption<AccountType>[] = [
  { optionLabel: 'LDAP', optionValue: 'ldap' },
  { optionLabel: 'Локальная', optionValue: 'local' },
]

export const ACCOUNTS_STORAGE_KEY = 'accounts'
