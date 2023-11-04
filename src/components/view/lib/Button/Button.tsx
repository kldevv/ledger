import { useMemo } from "react"

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  /**
   * Is button loading?
   */
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, loading = false, disabled, onClick, ...props }) => {
  const isDisabled = useMemo(() => {
    return loading && disabled;
  }, [loading, disabled]);

  return (
    <button disabled={isDisabled} onClick={isDisabled ? undefined : onClick} {...props}>
      {loading ? <span>loading</span> : <span>{children}</span>}
    </button>
  );
};