import type { Control, FieldValues, Path } from 'react-hook-form'
import { useController } from 'react-hook-form'
import { Listbox } from '@headlessui/react'
import { Fragment, useMemo } from 'react'
import classNames from 'classnames'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/20/solid'
import { Label } from '../Label'
import { ErrorMessage } from '../ErrorMessage'

export interface ListBoxProps<TFieldValues extends FieldValues> {
  /**
   * Select name
   */
  name: Path<TFieldValues>
  /**
   * Select items
   */
  options: { value: string; label: string }[]
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
  'mt-1 p-1',
  'bg-white shadow-md shadow-gray rounded-md',
  'z-10',
)

const optionCn = classNames(
  'gap-x-2 py-1.5 px-3',
  'text-sm leading-6 text-dark-shades',
  'min-w-full flex items-center',
  'rounded',
)

export const ListBox = <TFieldValues extends FieldValues>({
  name,
  control,
  options,
  label,
  multiple = false,
}: ListBoxProps<TFieldValues>) => {
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
    <div className="w-[12rem] flex flex-col relative mt-[0.125rem]">
      <Listbox {...field} as="div" multiple={multiple}>
        {({ open }) => (
          <>
            <Listbox.Label as={Fragment}>
              <Label htmlFor={`listbox-${name}`}>{label}</Label>
            </Listbox.Label>
            <Listbox.Button className={buttonCn} id={`listbox-${name}`}>
              <div className="min-h-[30px] flex items-center relative w-full gap-2">
                <span className="mr-[1.75rem] whitespace-nowrap overflow-hidden overflow-ellipsis text-left">
                  {displayValue}
                </span>
                <div className="absolute right-1 text-gray">
                  {open ? (
                    <ChevronUpIcon className="w-5 h-5" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5" />
                  )}
                </div>
              </div>
            </Listbox.Button>
            <Listbox.Options className={optionsCn}>
              {options.map(({ value, label }) => (
                <Listbox.Option
                  key={`${value}:${label}`}
                  value={value}
                  as={Fragment}
                >
                  {({ active, selected }) => (
                    <li
                      className={classNames(
                        optionCn,
                        active ? 'bg-mid-gray' : undefined,
                      )}
                    >
                      {label}
                      {selected && multiple && (
                        <CheckIcon className="w-3 h-3 font-bold text-light-accent" />
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
