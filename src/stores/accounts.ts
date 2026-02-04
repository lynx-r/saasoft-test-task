import { PAGE_LIMIT } from '@/constants/pagination'
import useServices from '@/services/useServices'
import { type Account } from '@/types'
import { defineStore } from 'pinia'
import type { VirtualScrollerLazyEvent } from 'primevue/virtualscroller'
import { onBeforeMount, ref, shallowRef } from 'vue'

const useAccountsStore = defineStore('accounts', () => {
  const scrollerLazyEvent = ref<VirtualScrollerLazyEvent>({ first: 0, last: PAGE_LIMIT })
  const accounts = shallowRef<Account[]>([])
  const { accountsService } = useServices()

  const createAccount = async () => {
    await accountsService.createEmptyAccount()
    const { data } = await accountsService.getAccounts(
      scrollerLazyEvent.value.first,
      scrollerLazyEvent.value.last + 1,
    )
    accounts.value = data
  }

  const updateAccount = async (id: string, newAccount: Account) => {
    await accountsService.updateAccount(id, newAccount)
    const { data } = await accountsService.getAccounts(
      scrollerLazyEvent.value.first,
      scrollerLazyEvent.value.last,
    )
    accounts.value = data
  }

  const deleteAccount = async (id: string) => {
    await accountsService.deleteAccount(id)
    const { data } = await accountsService.getAccounts(
      scrollerLazyEvent.value.first,
      scrollerLazyEvent.value.last,
    )
    accounts.value = data
  }

  const getAccounts = async (event: VirtualScrollerLazyEvent) => {
    scrollerLazyEvent.value = event
    const { first, last } = event
    const { data } = await accountsService.getAccounts(first, last)
    const newAccounts = [...accounts.value]
    for (let i = first, j = 0; i < last; i++, j++) {
      newAccounts[i] = data[j]!
    }
    accounts.value = newAccounts
  }

  onBeforeMount(async () => {
    const { totalCount } = await accountsService.getAccounts()
    accounts.value = Array.from({ length: totalCount })
  })

  return { accounts, getAccounts, createAccount, updateAccount, deleteAccount }
})

export default useAccountsStore
