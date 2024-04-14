export interface BaseLayoutProps {
  /**
   * Children
   */
  children: React.ReactNode
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return <div className="flex h-screen w-screen">{children}</div>
}
