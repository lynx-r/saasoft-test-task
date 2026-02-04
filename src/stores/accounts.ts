import { mapAccountsToString, mapStringToAccounts } from '@/mappers'
import { type Account } from '@/types'
import { defaultAccount } from '@/utils'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

const useAccountsStore = defineStore('accounts', () => {
  const accounts = useStorage<Account[]>('accounts', [], undefined, {
    serializer: {
      read: mapStringToAccounts,
      write: mapAccountsToString,
    },
  })

  const addAccount = () => {
    accounts.value.push(defaultAccount())
  }

  const updateAccount = (id: string, updatedAccount: Account) => {
    accounts.value = accounts.value.map((acc) => (acc.id === id ? updatedAccount : acc))
  }

  const deleteAccount = (id: string) => {
    accounts.value = accounts.value.filter((acc) => acc.id !== id)
  }

  return { accounts, addAccount, updateAccount, deleteAccount }
})

export default useAccountsStore
