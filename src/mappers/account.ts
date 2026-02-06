import type { Account, AccountSerialized, TagSerialized } from '@/types/account'

export const mapStringToTags = (tag: string): TagSerialized[] => {
  const arr = tag.split(/\s*;+\s*/)
  if (arr[0] === '') {
    arr.shift()
  }
  if (arr[arr.length - 1] === '') {
    arr.pop()
  }
  return arr.map((text) => ({ text }))
}

const mapTagsToString = (tags: TagSerialized[]): string =>
  tags?.map(({ text }) => text).join(';') || ''

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
