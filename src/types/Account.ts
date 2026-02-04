import { mapStringToTags } from '@/mappers/account'
import z from 'zod'

const AccountTypeSchema = z.enum(['ldap', 'local'])

export const AccountSchema = z.object({
  id: z.uuid().default(() => crypto.randomUUID()),
  tag: z
    .string()
    .min(0)
    .max(50)
    .regex(/(\w+;)*/)
    .trim()
    .refine(
      (tagsStr: string) => {
        const tags = mapStringToTags(tagsStr).map(({ text }) => text)
        return new Set(tags).size === tags.length
      },
      {
        message: 'Теги не могут быть повторяющимися',
      },
    ),
  type: AccountTypeSchema,
  login: z.string().min(3).max(100).trim(),
  password: z
    .string()
    .min(4, 'Пароль может быть не меньше 4 символов')
    .max(100, 'Пароль не может быть больше 100 символов')
    .regex(/[A-Z]/, 'Пароль должен содержать минимум одну заглавную букву')
    .regex(/[a-z]/, 'Пароль должен содержать минимум одну строчную букву')
    .regex(/[0-9]/, 'Пароль должен содержать минимум одно число')
    .regex(/[^a-zA-Z0-9]/, 'Пароль должен содержать минимум один специальный символ')
    .trim()
    .nullable(),
})

export type Account = z.infer<typeof AccountSchema>

export type TagSerialized = { text: string }

export type AccountSerialized = Omit<Account, 'tag'> & { tag: TagSerialized[] }

export type AccountType = z.infer<typeof AccountTypeSchema>
