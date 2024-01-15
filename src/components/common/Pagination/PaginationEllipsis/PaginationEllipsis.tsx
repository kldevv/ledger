import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'

export const PaginationEllipsis: React.FC = () => {
  return (
    <div className="py-1 px-4 border border-r-0 border-mid-gray text-gray flex items-center">
      <EllipsisHorizontalIcon className="w-3 h-3 text-gray" />
    </div>
  )
}
