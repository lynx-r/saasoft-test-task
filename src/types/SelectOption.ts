import type { SelectProps } from 'primevue'

export type SelectOption<T = string> = {
  optionLabel: SelectProps['optionLabel']
  optionValue: T | ((data: unknown) => T) | undefined
}
