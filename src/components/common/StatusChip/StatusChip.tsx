import { Status } from "@/api/graphql"

export type StatusChipProps = {
  /**
   * Status
   */
  status: Status
}

export const StatusChip: React.FC<StatusChipProps> = () => {


  return (
    <div className="flex gap-x-2 items-center">
      <div className="p-1 rounded-full flex-none bg-[rgb(74,222,128,0.1)]">
        <div className="w-1.5 h-1.5 rounded-full text-current bg-[#4ade80]" />
      </div>
      Complete
    </div>
  );
}