import { Root } from '@radix-ui/react-radio-group';
import { WalletCard } from './WalletCard';
import { useCallback, useState } from 'react';

export const WalletRadioCards: React.FC = () => {
  const wallets = [
    { id: '1', name: 'My USD Wallet', currency: 'USD' },
    { id: '2', name: 'My EUR Wallet', currency: 'EUR' },
    { id: '3', name: 'My NTD Wallet', currency: 'NTD' },
  ];

  const [selected, setSelected] = useState('1')

  const handleOnValueChange = useCallback((value: string) => {
    console.log(value)
    setSelected(value)
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
        {wallets.map((prop) => {
          return <WalletCard key={prop.id} selected={selected} {...prop} />;
        })}
      </div>
    </Root>
  );
};
