import { RadioGroup } from '@headlessui/react'
import classNames from 'classnames'

export interface PaginationPageProps {
  /**
   * Page number
   */
  page: number
}

export const PaginationPage: React.FC<PaginationPageProps> = ({ page }) => {
  return (
    <RadioGroup.Option
      key={page}
      value={page}
      className={({ checked }) =>
        classNames(
          'py-1 px-4 border border-r-0 border-mid-gray text-gray cursor-pointer hover:text-light-accent focus:text-light-accent',
          checked ? 'text-light-accent' : null,
        )
      }
    >
      {page + 1}
    </RadioGroup.Option>
  )
}
