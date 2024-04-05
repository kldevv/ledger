import { BranchSwitch } from '..'

export const NavMenu: React.FC = () => {
  return (
    <div className="border-b-mid-gray sticky top-0 z-10 flex h-14 w-full items-center border-b bg-white shadow-sm">
      <div className="ml-4">
        <BranchSwitch />
      </div>
    </div>
  )
}
