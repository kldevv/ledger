export const TopNavigationBar: React.FC = () => {
  return (
    <div className="w-full h-full border-b border-b-mid-gray shadow-sm flex items-center px-8">
      <span className="font-bold text-lg leading-6 text-dark-shades">
        ::: Luca :::
      </span>
      <div className="ml-auto font-medium flex space-x-3">
        <span>About</span>
        <span>Github</span>
      </div>
    </div>
  )
}
