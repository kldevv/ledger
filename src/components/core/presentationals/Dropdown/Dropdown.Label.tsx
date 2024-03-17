import { Listbox } from '@headlessui/react'

export interface LabelProps {
  /**
   * Label
   */
  label: string
}

export const Label: React.FC<LabelProps> = ({ label }) => {
  return (
    <Listbox.Label className="text-gray whitespace-nowrap text-xs font-medium leading-6">
      {label}
    </Listbox.Label>
  )
}
