import type { ReactNode } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'

import { Listbox } from '@headlessui/react'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { Fragment, useMemo } from 'react'
import { useController } from 'react-hook-form'

import { Label, ErrorMessage, LoadingBox } from '@/components/common'

import { MultiSelectChips } from './MultiSelectChips'

export interface DropdownProps<TFieldValues extends FieldValues> {
  /**
   * Select name
   */
  name: Path<TFieldValues>
  /**
   * Select items
   */
  options: Array<DropdownOption>
  /**
   * Select label
   */
  label: string
  /**
   * Is multiple selectable?
   */
  multiple?: boolean
  /**
   * Optional control to explicitly set `react-hook-form` control
   */
  control?: Control<TFieldValues>
  /**
   * Loading?
   */
  loading?: boolean
}

export type DropdownOption = {
  /**
   * Value
   */
  value: string
  /**
   * Display label
   */
  label: ReactNode
}

const optionsCn = classNames(
  'w-full',
  'max-h-[15rem]',
  'overflow-auto',
  'absolute',
  'p-1',
  'bg-white shadow-md shadow-gray rounded-md',
  'z-10',
)

const optionCn = classNames(
  'gap-x-2 py-1.5 px-3',
  'text-sm leading-6 text-dark-shades',
  'min-w-full flex items-center',
  'rounded',
)

export const Dropdown = <TFieldValues extends FieldValues>({
  name,
  control,
  options,
  label,
  loading,
  multiple = false,
}: DropdownProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
    control,
  })

  const buttonCn = classNames(
    'py-1.5 px-3',
    'w-full h-[2.5rem]',
    'flex items-center',
    'bg-white rounded-md border border-mid-gray text-dark-shades',
    'font-normal text-sm leading-6 outline-none',
  )

  const displayValue = useMemo(() => {
    return multiple ? (
      <MultiSelectChips values={field.value} options={options} />
    ) : (
      options.find(({ value }) => value === field.value)?.label
    )
  }, [multiple, options, field.value])

  return (
    <div className="relative flex w-full flex-col">
      <Listbox {...field} as="div" multiple={multiple}>
        {({ open }) => (
          <>
            <Listbox.Label as={Fragment}>
              <Label htmlFor={`listbox-${name}`}>{label}</Label>
            </Listbox.Label>
            {loading === true ? (
              <LoadingBox className="h-[30px] w-full" />
            ) : (
              <Listbox.Button className={buttonCn} id={`listbox-${name}`}>
                <div className="relative flex h-[30px] w-full items-center">
                  <div className="mr-[1.75rem] w-full truncate text-left">
                    {displayValue}
                  </div>
                  <div className="text-gray absolute right-1">
                    {open ? (
                      <ChevronUpIcon className="size-5" />
                    ) : (
                      <ChevronDownIcon className="size-5" />
                    )}
                  </div>
                </div>
              </Listbox.Button>
            )}
            <Listbox.Options className={optionsCn}>
              {options.map(({ value, label }) => (
                <Listbox.Option key={value} value={value} as={Fragment}>
                  {({ active, selected }) => (
                    <li
                      className={classNames(
                        optionCn,
                        active ? 'bg-mid-gray' : undefined,
                      )}
                    >
                      {label}
                      {selected && multiple && (
                        <CheckIcon className="size-3 font-bold" />
                      )}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </>
        )}
      </Listbox>
      <ErrorMessage error={error?.message} />
    </div>
  )
}
