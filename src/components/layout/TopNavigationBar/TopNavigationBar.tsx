import { TreasuryBookSelector } from '..'

export const TopNavigationBar: React.FC = () => {
  return (
    <div className="w-full h-full border-b border-b-mid-gray shadow-sm flex px-8">
      <div className="h-full flex-initial flex items-center">
        <span className="font-bold text-lg leading-6 text-dark-shades">
          ::: Luca :::
        </span>
      </div>
      <div className="h-full flex-1 flex flex-col items-center justify-center">
        <TreasuryBookSelector />
      </div>
      <div className="h-full font-medium flex items-center flex-initial space-x-6">
        <span className="font-semibold leading-6 text-dark-shades">Github</span>
      </div>
    </div>
  )
}
