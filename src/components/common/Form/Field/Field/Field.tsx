import { ErrorMessage } from '@hookform/error-message';
import * as Label from '@radix-ui/react-label';
import { useFormContext } from 'react-hook-form';

export interface FieldProps {
  /**
   * Field input id
   */
  inputId: string;
  /**
   * Field input name
   */
  name: string
  /**
   * Field label
   */
  label: string;
  /**
   * Field controller
   */
  children: React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({ name, inputId, label, children }) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="max-w-xs flex flex-col my-2">
      <Label.Root
        className="w-full text-xs leading-6 font-medium text-dark-shades"
        htmlFor={inputId}
      >
        {label}
      </Label.Root>
      {children}
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => (
          <span role='alert' className="text-xs font-normal text-red">{message}</span>
        )}
      />
    </div>
  );
};