export const InfoBubble: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="border-mid-gray flex w-fit select-none items-center rounded-xl border bg-white px-3">
      {children}
    </div>
  )
}
