import type { Account, AccountSerialized, AccountTag } from '@/modules/accounts/accounts.types'

export const mapStringToTags = (tag: string): AccountTag[] => {
  const arr = tag.split(/\s*;+\s*/)
  return arr.filter((t) => !!t).map((text) => ({ text }))
}

const mapTagsToString = (tags: AccountTag[]): string =>
  tags?.map(({ text }) => text).join('; ') || ''

export const mapAccountsToString = (accounts: Account[]): string => {
  const value = accounts.map((acc) => ({
    ...acc,
    tag: mapStringToTags(acc.tag),
  }))
  return JSON.stringify(value)
}

export const mapStringToAccounts = (accountStr: string): Account[] => {
  if (!accountStr) {
    return []
  }
  const value = JSON.parse(accountStr)
  return value.map((acc: AccountSerialized) => ({ ...acc, tag: mapTagsToString(acc.tag) }))
}
