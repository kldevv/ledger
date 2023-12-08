import { Root } from '@radix-ui/react-radio-group';
import { WalletRadioCard } from './WalletRadioCard';
import { useCallback, useState } from 'react';
import { useWalletContext } from '@/hooks';

export const WalletRadioCards: React.FC = () => {
  const [{ currentWalletId, wallets }, { setCurrentWalletId }] = useWalletContext();

  const [selected, setSelected] = useState(currentWalletId);

  const handleOnValueChange = useCallback((value: string) => {
    setSelected(value)
    setCurrentWalletId?.(value)
  }, [])

  return (
    <Root
      orientation="vertical"
      value={selected}
      onValueChange={handleOnValueChange}
      aria-label="Wallet"
      className='w-96'
    >
      <div className="flex flex-col gap-y-2">
        {wallets?.map((prop) => {
          return (
            <WalletRadioCard key={prop.id} {...prop} />
          );
        })}
      </div>
    </Root>
  );
};
