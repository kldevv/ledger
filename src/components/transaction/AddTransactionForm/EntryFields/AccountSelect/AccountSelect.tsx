import { useGetAccountsQuery } from '@/api/graphql';
import { Select } from '@/components/common';
import { useVaultContext } from '@/hooks';
import { useTranslation } from 'react-i18next';

export interface AccountSelectProps {
  /**
   * Index of the entry fields
   */
  index: number;
}

export const AccountSelect: React.FC<AccountSelectProps> = ({ index }) => {
  const { t } = useTranslation('transaction');
  const [{ curVaultId }] = useVaultContext();

  const { data } = useGetAccountsQuery({
    variables: {
      input: {
        vaultId: curVaultId,
      },
    },
    skip: curVaultId == null,
  });

  return (
    <Select
      label={t('add-transaction-form.label.entries.account')}
      name={`entries.${index}.accountId` as const}
      items={
        data?.getAccounts.map(({ id, name }) => ({ value: id, label: name })) ??
        []
      }
    />
  );
};
