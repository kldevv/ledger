import { Tab } from '@headlessui/react'
import classNames from 'classnames'
import { Fragment } from 'react'

import { ButtonCore } from '..'

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
    <Tab.Group>
      <Tab.List className="border-b-mid-gray flex w-full items-center space-x-1 border-b">
        {options.map(({ label }) => (
          <Tab key={String(label)} as={Fragment}>
            {({ selected }) => (
              <ButtonCore
                className={classNames(
                  'size-full outline-none text-xs font-medium',
                  selected
                    ? 'text-light-accent border-b-2 border-b-light-accents'
                    : 'text-gray',
                )}
              >
                <div className="hover:bg-light-accent-halo size-full rounded-md p-1">
                  {label}
                </div>
              </ButtonCore>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {options.map(({ label, content }) => (
          <Tab.Panel key={String(label)}>{content}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}
