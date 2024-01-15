import { RadioGroup } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useCallback, useMemo, useState } from 'react'

import { Button, PaginationEllipsis, PaginationPage } from '..'

export interface PaginationProps {
  /**
   * Total page number
   */
  pageCount: number
  /**
   * Page on change
   */
  onChange?: (value: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  onChange,
}) => {
  const [selectedPage, setSelectedPage] = useState(0)

  const pageArray = useMemo(
    () => Array.from(Array(pageCount).keys()),
    [pageCount],
  )

  const handleOnChange = useCallback(
    (value: number) => {
      onChange?.(value)
      setSelectedPage(value)
    },
    [onChange],
  )

  const handleOnPageIncrement = useCallback(
    (change: number) => () =>
      setSelectedPage((prev) =>
        Math.min(Math.max(0, prev + change), pageCount - 1),
      ),
    [pageCount],
  )

  const remainingPages = pageCount - selectedPage - 1

  return (
    <div className="flex items-center">
      <Button onClick={handleOnPageIncrement(-1)}>
        <div className="py-1 px-4 border border-r-0 border-mid-gray rounded-l-lg">
          <ChevronLeftIcon className="w-6 h-6 text-gray" />
        </div>
      </Button>
      <RadioGroup
        as="div"
        className="flex"
        onChange={handleOnChange}
        value={selectedPage}
      >
        {pageCount <= 6 ? (
          pageArray.map((page) => <PaginationPage key={page} page={page} />)
        ) : (
          <>
            {selectedPage < 2 &&
              pageArray
                .slice(0, Math.min(5, pageCount))
                .map((page) => <PaginationPage key={page} page={page} />)}
            {selectedPage > 2 && (
              <>
                <PaginationPage page={0} />
                <PaginationEllipsis />
              </>
            )}
            {selectedPage >= 2 &&
              remainingPages > 3 &&
              pageArray
                .slice(
                  Math.max(0, selectedPage - 2),
                  Math.min(pageCount, selectedPage + 3),
                )
                .map((page) => <PaginationPage key={page} page={page} />)}
            {remainingPages > 3 && (
              <>
                <PaginationEllipsis />
                <PaginationPage page={pageCount - 1} />
              </>
            )}
            {selectedPage >= 2 &&
              remainingPages <= 3 &&
              pageArray
                .slice(pageCount - 5, pageCount)
                .map((page) => <PaginationPage key={page} page={page} />)}
          </>
        )}
      </RadioGroup>
      <Button onClick={handleOnPageIncrement(1)}>
        <div className="py-1 px-4 border border-mid-gray rounded-r-lg">
          <ChevronRightIcon className="w-6 h-6 text-gray" />
        </div>
      </Button>
    </div>
  )
}
