import { mapStringToTags } from '@/mappers/account'
import z from 'zod'

const AccountTypeSchema = z.enum(['ldap', 'local'])

const BaseAccount = z.object({
  id: z.uuid().default(() => crypto.randomUUID()),
  tag: z
    .string()
    .max(50)
    .regex(/(\w+;)*/)
    .trim()
    .refine(
      (tagsStr) => {
        const tags = mapStringToTags(tagsStr).map(({ text }) => text)
        return new Set(tags).size === tags.length
      },
      { message: 'Теги не могут быть повторяющимися' },
    ),
  login: z
    .string()
    .min(3, 'Логин должен быть не менее 3 символов')
    .max(100, 'Логин не может быть больше 100 символов')
    .trim(),
})

export const AccountSchema = z.discriminatedUnion('type', [
  BaseAccount.extend({
    type: z.literal('ldap'),
    password: z.string().optional(),
  }),

  BaseAccount.extend({
    type: z.literal('local'),
    password: z
      .string()
      .min(4, 'Пароль должен быть не меньше 4 символов')
      .max(100, 'Пароль не может быть больше 100 символов')
      .regex(/[A-Z]/, 'Заглавная буква обязательна')
      .regex(/[a-z]/, 'Строчная буква обязательна')
      .regex(/[0-9]/, 'Цифра обязательна')
      .regex(/[^a-zA-Z0-9]/, 'Спецсимвол обязателен')
      .trim(),
  }),
])

export type Account = z.infer<typeof AccountSchema>

export type TagSerialized = { text: string }

export type AccountSerialized = Omit<Account, 'tag'> & { tag: TagSerialized[] }

export type AccountType = z.infer<typeof AccountTypeSchema>
