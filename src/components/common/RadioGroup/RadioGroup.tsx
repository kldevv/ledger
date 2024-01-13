import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react'
import React, { useCallback, useState } from 'react'

export interface RadioGroupProps<TType> {
  /**
   * Radio group label
   */
  label: string
  /**
   * Options
   */
  options: {
    /**
     * Option key
     */
    value: TType
    /**
     * Option label
     */
    label: React.ReactNode
  }[]
  /**
   * On change
   */
  onChange?: (value: TType) => void
}

export const RadioGroup = <TType,>({
  options,
  label,
  onChange,
}: RadioGroupProps<TType>) => {
  const [selected, setSelected] = useState<TType>(options[0].value)

  const handleOnChange = useCallback(
    (value: TType) => {
      onChange?.(value)
      setSelected(value)
    },
    [onChange, setSelected],
  )

  return (
    <HeadlessRadioGroup value={selected} onChange={handleOnChange}>
      <HeadlessRadioGroup.Label className="sr-only" as="p">
        {label}
      </HeadlessRadioGroup.Label>
      <div className="flex">
        {options.map(({ label, value }) => (
          <HeadlessRadioGroup.Option
            key={value}
            value={value}
            className={({ checked }) =>
              `flex focus:outline-none cursor-pointer first:rounded-l-lg last:rounded-r-lg border px-6 bg-white ${
                checked ? 'border-light-accent' : 'border-mid-gray'
              }`
            }
          >
            {({ checked }) => (
              <div className="flex items-center text-sm font-medium leading-6">
                <HeadlessRadioGroup.Label
                  as="button"
                  className={`${checked ? 'text-light-accent' : 'text-gray'}`}
                >
                  {label}
                </HeadlessRadioGroup.Label>
              </div>
            )}
          </HeadlessRadioGroup.Option>
        ))}
      </div>
    </HeadlessRadioGroup>
  )
}
