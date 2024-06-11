export interface PageHeaderProps extends React.PropsWithChildren {
  /**
   * Header
   */
  header: string
  /**
   * Description
   */
  desc: string
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  header,
  desc,
  children,
}) => {
  return (
    <div className="flex w-full items-center">
      <div className="flex flex-col pr-6">
        <h1 className="whitespace-nowrap text-3xl font-extrabold">{header}</h1>
        <p className="text-gray mt-3 max-w-[50rem] text-base">{desc}</p>
      </div>
      <div className="ml-auto">{children}</div>
    </div>
  )
}
