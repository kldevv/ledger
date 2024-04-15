import type { Dispatch, SetStateAction } from 'react'

import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'
import { useFieldArray } from 'react-hook-form'

import { ButtonCore } from '@/components/core/presentationals'

import {
  JournalFormEntry,
  type JournalFormaValues,
} from './JournalForm.Entry/JournalForm.Entry'

export interface JournalFormEntrySelectorProps {
  /**
   * Default value
   */
  defaultValue: JournalFormaValues['entries'][number]
  /**
   * Set active entry
   */
  setActiveEntry: Dispatch<SetStateAction<number>>
  /**
   * Active entry
   */
  activeEntry: number
}

export const JournalFormEntrySelector: React.FC<
  JournalFormEntrySelectorProps
> = ({ defaultValue, setActiveEntry, activeEntry }) => {
  const { t } = useTranslation('journal')
  const { fields, append, remove } = useFieldArray<JournalFormaValues>({
    name: 'entries',
    shouldUnregister: false,
  })

  const handleOnSelect = useCallback(
    (index: number) => () => setActiveEntry(index),
    [setActiveEntry],
  )

  const handleOnEntryAppend = useCallback(
    () => append(defaultValue),
    [append, defaultValue],
  )

  const handleOnRemove = useCallback(
    (index: number) => () => {
      setActiveEntry((prev) => Math.min(fields.length - 2, prev))
      remove(index)
    },
    [fields.length, remove, setActiveEntry],
  )

  return (
    <div className="border-mid-gray flex size-full min-w-80 max-w-80 flex-col items-start overflow-scroll border-r">
      {fields.map(({ id }, index) => (
        <JournalFormEntry
          key={id}
          index={index}
          onSelect={handleOnSelect(index)}
          onRemove={fields.length > 2 ? handleOnRemove(index) : undefined}
          active={activeEntry === index}
        />
      ))}
      <ButtonCore
        className="text-light-accent hover:text-light-accent/80 hover:bg-mid-gray/20 mb-10 size-fit max-h-fit text-nowrap py-4 text-xs font-medium"
        onClick={handleOnEntryAppend}
      >
        {t`journalForm.addEntry`}
      </ButtonCore>
    </div>
  )
}
