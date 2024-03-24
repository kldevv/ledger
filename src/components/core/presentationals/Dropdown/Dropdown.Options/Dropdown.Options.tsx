import classNames from 'classnames'

import type { DropdownItem } from '../Dropdown'
import type { UseSelectPropGetters } from 'downshift'

export interface DropdownOptionsProps<ItemValue>
  extends Partial<
    Omit<
      UseSelectPropGetters<ItemValue>,
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
   * Is open?
   */
  isOpen?: boolean
}

export const DropdownOptions = <ItemValue,>({
  items,
  highlightedIndex,
  getItemProps,
  getMenuProps,
  isOpen = false,
  selectedItem,
}: DropdownOptionsProps<ItemValue>) => {
  return (
    <ul
      className={classNames(
        'shadow-mid-gray absolute z-10 mt-1 w-full min-w-min overflow-y-scroll rounded text-xs shadow-md bg-white',
        {
          hidden: !isOpen,
        },
      )}
      {...getMenuProps?.()}
    >
      {isOpen &&
        items?.map((item, index) => (
          <li
            className={classNames(
              highlightedIndex === index && 'bg-mid-gray',
              'px-2 py-1 cursor-pointer flex flex-col',
            )}
            key={item.id}
            {...getItemProps?.({ item: item.value, index })}
          >
            <span
              className={classNames({ 'font-semibold': selectedItem === item })}
            >
              {item.title}
            </span>
            {item.desc != null && (
              <span className="text-gray mt-1 text-[0.625rem] leading-4">
                {item.desc}
              </span>
            )}
          </li>
        ))}
    </ul>
  )
}
