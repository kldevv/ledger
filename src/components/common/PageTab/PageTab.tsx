import { Tab } from '@headlessui/react'
import classNames from 'classnames'
import { Fragment } from 'react'

import { Button } from '..'

export interface PageTabProps {
  /**
   * Tab options
   */
  options: Array<{
    /**
     * Tab label
     */
    label: React.ReactNode
    /**
     * Tab content
     */
    content: React.ReactNode
  }>
}

export const PageTab: React.FC<PageTabProps> = ({ options }) => {
  return (
    <Tab.Group as="div" className="w-full">
      <Tab.List>
        <div className="border-b-mid-gray flex w-full items-center space-x-2 border-b">
          {options.map(({ label }) => (
            <Tab key={String(label)} as={Fragment}>
              {({ selected }) => (
                <Button
                  className={classNames(
                    'size-full px-5 py-1 outline-none text-xs leading-6 font-medium',
                    selected
                      ? 'text-light-accent border-b-2 border-b-light-accents'
                      : 'text-gray',
                  )}
                >
                  {label}
                </Button>
              )}
            </Tab>
          ))}
        </div>
      </Tab.List>
      <Tab.Panels className="mt-6">
        {options.map(({ label, content }) => (
          <Tab.Panel key={String(label)}>{content}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}
