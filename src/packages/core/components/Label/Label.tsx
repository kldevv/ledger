import type { DropdownItem } from '../Dropdown/Dropdown.Item/Dropdown.Item'
import type { UseSelectPropGetters } from 'downshift'

export interface LabelProps
  extends Partial<Pick<UseSelectPropGetters<DropdownItem>, 'getLabelProps'>> {
  /**
   * Label text
   */
  t?: string
}

export const Label: React.FC<LabelProps> = ({ t, getLabelProps }) => {
  if (t == null) {
    return null
  }

  return (
    <label
      className="text-gray whitespace-nowrap text-[0.625rem] font-medium"
      data-testid="field-label"
      {...getLabelProps?.()}
    >
      {t}
    </label>
  )
}
