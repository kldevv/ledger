import clsx from 'clsx'
import { useTranslation } from 'next-i18next'

import { Icon, LoadingSpinner } from '../..'
import { DropdownItem } from '../Dropdown.Item/Dropdown.Item'
import { useDropdownState } from '../Dropdown.State/Dropdown.State'

export interface DropdownMenuProps {
  /**
   * Items
   */
  items: DropdownItem[]
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ items }) => {
  const { t } = useTranslation('common')
  const { isOpen, getMenuProps, menuLoading } = useDropdownState()

  const empty = items.length === 0

  return (
    <div
      className={clsx(
        'shadow-mid-gray absolute z-10 mt-1 max-h-48 w-full overflow-y-scroll rounded bg-white text-xs shadow-md',
        {
          hidden: !isOpen,
        },
      )}
      {...getMenuProps?.()}
      data-testid="dropdown-menu"
    >
      {/* Loading state */}
      {menuLoading === true && (
        <div className="flex h-24 w-full items-center justify-center">
          <LoadingSpinner className="size-8" />
        </div>
      )}

      {/* Empty state */}
      {menuLoading !== true && empty && (
        <div className="text-gray flex h-24 w-full select-none items-center justify-center gap-x-2">
          <Icon name="ExclamationCircle" />
          {t`dropdown.empty`}
        </div>
      )}

      {/* Items */}
      {menuLoading !== true &&
        !empty &&
        items.map((item, index) => {
          const key = `${item.value}-${index}`

          return <DropdownItem key={key} {...item} index={index} />
        })}
    </div>
  )
}
