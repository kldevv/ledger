import { RadioGroup } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useCallback, useMemo } from 'react'

import { Button, PaginationEllipsis, PaginationPage } from '..'

export interface PaginationProps {
  /**
   * Total page number
   */
  pageCount: number
  /**
   * Set selected page
   */
  setSelectedPage: (value: number) => void
  /**
   * Selected page
   */
  selectedPage: number
}

export const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  setSelectedPage,
  selectedPage,
}) => {
  const pageArray = useMemo(
    () => Array.from(Array(pageCount).keys()),
    [pageCount],
  )

  const handleOnPageIncrement = useCallback(
    (change: number) => () => {
      setSelectedPage(
        Math.min(Math.max(0, selectedPage + change), pageCount - 1),
      )
    },
    [pageCount, selectedPage, setSelectedPage],
  )

  const remainingPages = pageCount - selectedPage - 1

  return (
    <div className="flex items-center">
      <Button onClick={handleOnPageIncrement(-1)}>
        <div className="border-mid-gray rounded-l-lg border border-r-0 px-4 py-1">
          <ChevronLeftIcon className="text-gray size-6" />
        </div>
      </Button>
      <RadioGroup
        as="div"
        className="flex"
        onChange={setSelectedPage}
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
        <div className="border-mid-gray rounded-r-lg border px-4 py-1">
          <ChevronRightIcon className="text-gray size-6" />
        </div>
      </Button>
    </div>
  )
}
