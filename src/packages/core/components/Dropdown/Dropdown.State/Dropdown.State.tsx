import { createContext, useContext } from 'react'

import type { DropdownItem } from '../Dropdown.Item/Dropdown.Item'
import type { UseSelectPropGetters } from 'downshift'

export interface DropdownState
  extends Omit<UseSelectPropGetters<DropdownItem>, 'getLabelProps'> {
  /**
   * Error message
   */
  error?: string
  /**
   * Menu loading
   */
  menuLoading?: boolean
  /**
   * Trigger loading
   */
  triggerLoading?: boolean
  /**
   * Highlighted index
   */
  highlightedIndex?: number
  /**
   * Is open
   */
  isOpen: boolean
  /**
   * Selected items
   */
  selected: DropdownItem | null
}

export const DropdownStateContext = createContext<DropdownState | null>(null)

export const useDropdownState = () => {
  const context = useContext(DropdownStateContext)

  if (context == null) {
    throw new Error('useDropdownState can only be used within Dropdown')
  }

  return context
}
