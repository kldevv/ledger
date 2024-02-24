import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'
import { useFieldArray } from 'react-hook-form'

import { Button } from '@/components/common'
import { UpsertTransactionEntryField } from '@/components/transaction'
import { useAccountsContext } from '@/hooks'
import { addEntryDefaultValues } from '@/shared/zod/defaultValues'

import type { UpsertTransactionFormFieldValues } from '@/components/transaction'

export const UpsertTransactionEntryFieldArray: React.FC = () => {
  const { t } = useTranslation('transaction')
  const { data } = useAccountsContext()

  const { fields, append, remove } =
    useFieldArray<UpsertTransactionFormFieldValues>({
      name: 'entries',
    })

  const handleOnRemove = useCallback(
    (index: number) => () => {
      void remove?.(index)
    },
    [remove],
  )

  const handleOnAppend = useCallback(() => {
    void append?.(
      {
        ...addEntryDefaultValues,
        accountId: data?.accounts[0].id ?? '',
      },
      {
        shouldFocus: false,
      },
    )
  }, [append, data?.accounts])

  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-y-8">
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="mb-2 flex items-center">
              <div className="text-light-accent text-xs font-medium leading-6">
                {t('UpsertTransactionForm.title', {
                  index: index + 1,
                })}
              </div>
              {fields.length > 2 && (
                <Button className="ml-auto" onClick={handleOnRemove(index)}>
                  <XMarkIcon className="text-gray size-4" />
                </Button>
              )}
            </div>
            <UpsertTransactionEntryField index={index} />
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
