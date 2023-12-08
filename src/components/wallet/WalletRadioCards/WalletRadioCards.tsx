import { Root } from '@radix-ui/react-radio-group';
import { WalletRadioCard } from './WalletRadioCard';
import { useCallback, useState } from 'react';
import { useWalletContext } from '@/hooks';

export const WalletRadioCards: React.FC = () => {
  const [{ curWalletId, wallets }, { setCurWalletId }] = useWalletContext();

  const [selected, setSelected] = useState(curWalletId);

  const handleOnValueChange = useCallback(
    (value: string) => {
      setSelected(value);
      setCurWalletId?.(value);
    },
    [setCurWalletId]
  );

  return (
    <Root
      orientation="vertical"
      value={selected}
      onValueChange={handleOnValueChange}
      className="max-w-sm"
    >
      <div className="flex flex-col gap-y-2">
        {wallets?.map((prop) => {
          return <WalletRadioCard key={prop.id} {...prop} />;
        })}
      </div>
    </Root>
  );
};
