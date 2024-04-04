import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'

export const PaginationEllipsis: React.FC = () => {
  return (
    <div className="border-mid-gray text-gray flex items-center border border-r-0 px-4 py-1">
      <EllipsisHorizontalIcon className="text-gray size-3" />
    </div>
  )
}
