import { useGetAccountsQuery } from '@/api/graphql';
import { useFormSelect } from '@/components/common';
import { AddTransactionFormFieldValues } from '@/components/transaction';
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
  const Select = useFormSelect<AddTransactionFormFieldValues>();

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
      name={`entries.${index}.accountId`}
      items={
        data?.getAccounts.map(({ id, name }) => ({ value: id, label: name })) ??
        []
      }
    />
  );
};
