import { RadioGroup } from '@headlessui/react'
import classNames from 'classnames'

export interface RadioGroupFilterProps<TValue extends string | number> {
  /**
   * Dropdown options
   */
  options: { value: TValue; label: React.ReactNode }[]
  /**
   * On change
   */
  onChange: (value: TValue) => void
  /**
   * Current value
   */
  value: TValue
}

export const RadioGroupFilter = <TValue extends string | number>({
  options,
  value,
  onChange,
}: RadioGroupFilterProps<TValue>) => {
  return (
    <RadioGroup
      className="relative flex space-x-1"
      value={value}
      onChange={onChange}
    >
      {options.map(({ value, label }) => (
        <RadioGroup.Option value={value} key={value}>
          {({ active, checked }) => (
            <div
              className={classNames(
                'flex items-center',
                'py-1 px-6 rounded-md border border-mid-gray bg-white cursor-pointer',
                'font-medium text-xs leading-6',
                active || checked
                  ? 'text-dark-shades border-gray'
                  : 'text-gray',
                'hover:text-light-accent',
              )}
            >
              {label}
            </div>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  )
}
