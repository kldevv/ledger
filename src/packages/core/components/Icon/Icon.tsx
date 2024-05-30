import * as IconSVGs from './SVGs'

export interface IconProps {
  /**
   * Class name?
   */
  className?: string
  /**
   * Icon name
   */
  name: keyof typeof IconSVGs
}

export interface IconSVGProps extends Omit<IconProps, 'name'> {}

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  // eslint-disable-next-line import/namespace
  const IconSVG = IconSVGs[name]

  return (
    <div data-testid={`icon-${name.toLowerCase()}`}>
      <IconSVG {...props} />
    </div>
  )
}
