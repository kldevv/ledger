import classNames from 'classnames'

import { Icon, Spinner } from '../..'

import type { DropdownItem } from '../Dropdown'
import type { UseSelectPropGetters } from 'downshift'

export interface DropdownOptionsProps<ItemValue = string>
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
  /**
   * Is loading
   */
  loading?: boolean
}

export const DropdownOptions = <ItemValue,>({
  items,
  highlightedIndex,
  getItemProps,
  getMenuProps,
  isOpen = false,
  selectedItem,
  loading = false,
}: DropdownOptionsProps<ItemValue>) => {
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
      ) : (
        items?.map((item, index) => (
          <li
            className={classNames(
              highlightedIndex === index && 'bg-mid-gray/50',
              'px-2 py-1 cursor-pointer flex flex-col select-none',
              { 'font-semibold': selectedItem === item },
            )}
            key={String(item.value)}
            {...getItemProps?.({ item: item.value, index })}
          >
            <span className={classNames('flex gap-2 items-center')}>
              <span className="min-w-fit">
                {item?.outlineIcon != null ? (
                  <Icon.Outline name={item.outlineIcon} className="size-2.5" />
                ) : item?.solidIcon != null ? (
                  <Icon.Solid name={item.solidIcon} className="size-2.5" />
                ) : (
                  item.flagIcon && (
                    <Icon.Flag name={item.flagIcon} className="size-2.5" />
                  )
                )}
              </span>
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
