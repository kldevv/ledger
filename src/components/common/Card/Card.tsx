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
  variant?: 'sm' | 'md' | 'xl'
};

export const Card: React.FC<CardProps> = ({ children, variant = 'md' }) => {
  const maxWidth = useMemo(
      () =>
        (() => {
          switch (variant) {
            case 'sm':
              return 'max-w-sm';
            case 'xl':
              return 'max-w-xl';
            case 'md':
            default:
              return 'max-w-md';
          }
        })(),
      []
    );

  const cn = classNames(
    '-mx-4 mt-6',
    'rounded-lg shadow box-shadow shadow-darkMidGray',
    'overflow-auto',
     maxWidth
  )

  return (
    <div className={cn}>
      <div className="px-4 py-3">{children}</div>
    </div>
  );
};