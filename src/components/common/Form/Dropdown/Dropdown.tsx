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

export interface DropdownProps<TFieldValues extends FieldValues> {
  /**
   * Select name
   */
  name: Path<TFieldValues>
  /**
   * Select items
   */
  options: { value: string; label: ReactNode }[]
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

const buttonCn = classNames(
  'py-1.5 px-3 mt-[0.125rem]',
  'w-full h-[2.5rem]',
  'flex items-center',
  'bg-white rounded-md border border-mid-gray text-dark-shades',
  'font-normal text-sm leading-6',
  'focus:outline-light-accent focus:outline focus:bg-light-accent-halo',
)

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

  const displayValue = useMemo(() => {
    return multiple
      ? field.value
      : options.find(({ value }) => value === field.value)?.label
  }, [multiple, options, field.value])

  return (
    <div className="relative mt-[0.125rem] flex w-full flex-col">
      <Listbox {...field} as="div" multiple={multiple}>
        {({ open }) => (
          <>
            <Listbox.Label as={Fragment}>
              <Label htmlFor={`listbox-${name}`}>{label}</Label>
            </Listbox.Label>
            {loading === true ? (
              <LoadingBox className="mt-[0.125rem] h-[2.5rem] w-full" />
            ) : (
              <Listbox.Button className={buttonCn} id={`listbox-${name}`}>
                <div className="relative flex min-h-[30px] w-full items-center gap-2">
                  <span className="mr-[1.75rem] w-full truncate text-left">
                    {displayValue}
                  </span>
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
                        <CheckIcon className="text-light-accent size-3 font-bold" />
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