import { useController } from 'react-hook-form';
import * as Label from '@radix-ui/react-label';
import classNames from 'classnames';

export interface InputProps
  extends Omit<
    React.ComponentPropsWithoutRef<'input'>,
    'onChange' | 'value' | 'onBur'
  > {
  /**
   * Input label
   */
  label: string;
  /**
   * Input name
   */
  name: string;
}

export const Input: React.FC<InputProps> = ({
  name,
  label,
  type = 'text',
  className,
  ...props
}) => {
  const {
    field: { value, ...formProps },
  } = useController({
    name,
  });

  const cn = classNames(
    'mt-1, py-1.5 px-3',
    'w-full',
    'hadow-sm rounded-md shadow-mid-gray border border-mid-gray border-dark-gray',
    'font-normal text-sm leading-6 text-dark-shades',
    'focus:outline-light-accent focus:bg-light-accent-halo',
    className
  );

  return (
    <div className="max-w-xs flex flex-col my-2">
      <Label.Root
        className="w-full text-xs leading-6 font-medium text-dark-shades"
        htmlFor={name}
      >
        {label}
      </Label.Root>
      <input
        type={type}
        className={cn}
        value={value ?? ''}
        {...props}
        {...formProps}
      />
    </div>
  );
};
