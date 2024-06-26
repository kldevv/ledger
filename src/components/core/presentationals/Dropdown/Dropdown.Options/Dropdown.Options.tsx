import classNames from 'classnames'
import { useTranslation } from 'next-i18next'

import { Icon, Spinner } from '../..'
import { DropdownIcon } from '../Dropdown.Icon/Dropdown.Icon'

import type { DropdownItem } from '../Dropdown'
import type { UseSelectPropGetters } from 'downshift'

export interface DropdownOptionsProps<ItemValue = string>
  extends Partial<
    Omit<
      UseSelectPropGetters<DropdownItem<ItemValue>>,
      'getLabelProps' | 'getToggleButtonProps'
    >
  > {
  /**
   * Items
   */
  items?: DropdownItem<ItemValue>[]
  /**
   * Highlighted index
   */
  highlightedIndex?: number
  /**
   * Selected item
   */
  selectedItem?: DropdownItem<ItemValue> | null
  /**
   * Selected items
   */
  selectedItems?: DropdownItem<ItemValue>[] | null
  /**
   * Is open?
   */
  isOpen?: boolean
  /**
   * Is loading
   */
  loading?: boolean
}

export const DropdownOptions = <ItemValue,>({
  items = [],
  highlightedIndex,
  getItemProps,
  getMenuProps,
  isOpen = false,
  selectedItem,
  selectedItems,
  loading = false,
}: DropdownOptionsProps<ItemValue>) => {
  const { t } = useTranslation('common')

  return (
    <ul
      className={classNames(
        'shadow-mid-gray absolute z-10 mt-1 w-full max-h-48 overflow-y-scroll rounded text-xs shadow-md bg-white',
        {
          hidden: !isOpen,
        },
      )}
      {...getMenuProps?.()}
    >
      {isOpen && loading ? (
        <li className="flex h-24 w-full items-center justify-center">
          <Spinner className="size-8" />
        </li>
      ) : items.length === 0 ? (
        <li className="text-gray flex h-24 w-full select-none items-center justify-center gap-x-2">
          <Icon.Solid name="ExclamationCircle" />
          {t`dropdown.empty`}
        </li>
      ) : (
        items.map((item, index) => (
          <li
            className={classNames(
              highlightedIndex === index && 'bg-mid-gray/50',
              'p-2 cursor-pointer flex flex-col select-none',
              {
                'font-semibold':
                  selectedItem === item || selectedItems?.includes(item),
              },
            )}
            key={String(item.value)}
            {...getItemProps?.({ item, index })}
          >
            <span className="flex items-center gap-2">
              <DropdownIcon {...item} />
              {item.title}
            </span>
            {item.desc != null && (
              <span className="text-gray mt-1 text-[0.625rem] leading-4">
                {item.desc}
              </span>
            )}
          </li>
        ))
      )}
    </ul>
  )
}
