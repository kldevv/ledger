import { Root } from '@radix-ui/react-radio-group';
import { VaultRadioCard } from './VaultRadioCard';
import { useCallback, useState } from 'react';
import { useVaultContext } from '@/hooks';

export const VaultRadioCards: React.FC = () => {
  const [{ curVaultId, vaults }, { setCurVaultId }] = useVaultContext();

  const [selected, setSelected] = useState(curVaultId);

  const handleOnValueChange = useCallback(
    (value: string) => {
      setSelected(value);
      setCurVaultId?.(value);
    },
    [setCurVaultId]
  );

  return (
    <Root
      orientation="vertical"
      value={selected}
      onValueChange={handleOnValueChange}
      className="max-w-sm mt-3"
    >
      <div className="flex flex-col gap-y-2 min-w-max">
        {vaults?.map((prop) => {
          return <VaultRadioCard key={prop.id} {...prop} />;
        })}
      </div>
    </Root>
  );
};
