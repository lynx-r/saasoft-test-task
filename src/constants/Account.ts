import type { AccountType } from '@/types'
import type { SelectOption } from '@/types/components'

export const ACCOUNT_OPTIONS: SelectOption<AccountType>[] = [
  { optionLabel: 'LDAP', optionValue: 'ldap' },
  { optionLabel: 'Локальная', optionValue: 'local' },
]
