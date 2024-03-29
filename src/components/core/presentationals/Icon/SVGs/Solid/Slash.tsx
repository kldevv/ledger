import type { CoreSVGProps } from '../../Icon'

export const Slash: React.FC<CoreSVGProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0" />
    </svg>
  )
}
