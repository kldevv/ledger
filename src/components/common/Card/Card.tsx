import classNames from "classnames";
import { useMemo } from "react";

export type CardProps = {
  /**
   * Children component
   */
  children: React.ReactNode;
  /**
   * Variant
   */
  variant?: 'sm' | 'md' | '2xl'
};

export const Card: React.FC<CardProps> = ({ children, variant = 'md' }) => {
  const maxWidth = useMemo(
      () =>
        (() => {
          switch (variant) {
            case 'sm':
              return 'max-w-sm';
            case '2xl':
              return 'max-w-2xl';
            case 'md':
            default:
              return 'max-w-md';
          }
        })(),
      []
    );

  const cn = classNames(
    '-mx-5 mt-6',
    'rounded-lg shadow box-shadow shadow-gray',
    'overflow-auto',
    'max-h-screen',
    'min-w-fit',
    maxWidth
  );

  return (
    <div className={cn}>
      <div className="px-5 py-3 w-full overflow-auto">{children}</div>
    </div>
  );
};