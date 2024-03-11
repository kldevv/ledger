import type { ArrayPath, FieldArray, FieldValues } from 'react-hook-form'

import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'
import { useFieldArray } from 'react-hook-form'

import { Button } from '@/components/core'

import { EntryField } from '.'

import type { Currency } from '@/api/graphql'

export interface EntryFieldsProps<TFieldValues extends FieldValues> {
  /**
   * Name
   */
  name: ArrayPath<TFieldValues>
  /**
   * Append value
   */
  appendValue: FieldArray<TFieldValues, ArrayPath<TFieldValues>>
  /**
   * Override default currency
   */
  currency?: Currency
}

export const EntryFields = <TFieldValues extends FieldValues>({
  name,
  appendValue,
  currency,
}: EntryFieldsProps<TFieldValues>) => {
  const { t } = useTranslation('entry')

  const { fields, append, remove } = useFieldArray<TFieldValues>({
    name,
  })

  const handleOnRemove = useCallback(
    (index: number) => () => {
      void remove?.(index)
    },
    [remove],
  )

  const handleOnAppend = useCallback(() => {
    void append?.(appendValue, {
      shouldFocus: false,
    })
  }, [append, appendValue])

  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-y-8">
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="mb-2 flex items-center">
              <div className="text-light-accent text-xs font-medium leading-6">
                {t('EntryFields.entry', {
                  index: index + 1,
                })}
              </div>
              {fields.length > 2 && (
                <Button className="ml-auto" onClick={handleOnRemove(index)}>
                  <XMarkIcon className="text-gray size-4" />
                </Button>
              )}
            </div>
            <EntryField
              name={`${name}.${index}` as const}
              currency={currency}
            />
          </div>
        ))}
      </div>
      <Button onClick={handleOnAppend} className="mt-4">
        <div className=" bg-light-shades text-gray hover:bg-mid-gray flex place-content-center items-center rounded-md py-2 text-xs font-semibold">
          <PlusIcon className="size-5" />
        </div>
      </Button>
    </div>
  )
}
