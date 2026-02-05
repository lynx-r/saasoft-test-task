import useServices from '@/services/useServices'
import { type Account } from '@/types/account'
import { defineStore } from 'pinia'
import type { VirtualScrollerLazyEvent } from 'primevue/virtualscroller'
import { onBeforeMount, ref, shallowRef, watch } from 'vue'

const useAccountsStore = defineStore('accounts', () => {
  const scrollerLazyEvent = ref<VirtualScrollerLazyEvent>({ first: 0, last: 0 })
  const isFirstLoading = ref(false)
  const isLoading = ref(false)
  const isAdding = ref(false)
  const isUpdating = ref(false)
  const deletingId = ref<string | null>(null)
  const accounts = shallowRef<Account[]>([])
  const { accountsService } = useServices()

  const createAccount = async () => {
    isAdding.value = true
    await accountsService.createEmptyAccount()
    const { data } = await accountsService.getAccounts(
      scrollerLazyEvent.value.first,
      scrollerLazyEvent.value.last + 1,
    )
    accounts.value = data
    isAdding.value = false
  }

  const updateAccount = async (id: string, newAccount: Account) => {
    isUpdating.value = true
    await accountsService.updateAccount(id, newAccount)
    const { data } = await accountsService.getAccounts(
      scrollerLazyEvent.value.first,
      scrollerLazyEvent.value.last,
    )
    accounts.value = data
    isUpdating.value = false
  }

  const deleteAccount = async (id: string) => {
    deletingId.value = id
    await accountsService.deleteAccount(id)
    const { data } = await accountsService.getAccounts(
      scrollerLazyEvent.value.first,
      scrollerLazyEvent.value.last,
    )
    accounts.value = data
    deletingId.value = null
  }

  const getAccounts = async (event: VirtualScrollerLazyEvent) => {
    isLoading.value = true
    scrollerLazyEvent.value = event
    const { first, last } = event
    const { data } = await accountsService.getAccounts(first, last)
    const newAccounts = [...accounts.value]
    for (let i = first, j = 0; i < last; i++, j++) {
      newAccounts[i] = data[j]!
    }
    accounts.value = newAccounts
    isLoading.value = false
  }

  onBeforeMount(async () => {
    isFirstLoading.value = true
    const { totalCount } = await accountsService.getAccounts()
    accounts.value = Array.from({ length: totalCount })
    isFirstLoading.value = false
  })

  watch(isUpdating, (newValue) => {
    if (newValue) {
      document.body.style.cursor = 'wait'
    } else {
      document.body.style.cursor = 'default'
    }
  })

  return {
    accounts,
    isAdding,
    isUpdating,
    deletingId,
    isLoading,
    isFirstLoading,
    getAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
  }
})

export default useAccountsStore
