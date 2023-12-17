import { Currency, useGetVaultsQuery } from '@/api/graphql';
import { Button, Table } from '@/components/common';
import { useFormatter, useVaultContext } from '@/hooks';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { createColumnHelper } from '@tanstack/react-table';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export type VaultTableData = {
  /**
   * Vault id
   */
  id: string;
  /**
   * Vault name
   */
  name: string;
  /**
   * Vault currency
   */
  currency: Currency;
  /**
   * Vault updated date
   */
  updatedDate: Date;
  /**
   * Vault created date
   */
  createdDate: Date;
};

const columnHelper = createColumnHelper<VaultTableData>();

export const VaultTable: React.FC = () => {
  const { t } = useTranslation('vault');
  const [{ curVaultId }, { setCurVaultId }] = useVaultContext();
  const { formatDate } = useFormatter();
  
  const { data, loading, error } = useGetVaultsQuery({
    variables: {
      input: {
        ownerId: '000'
      }
    }
  })

  const createHandleOnVaultSwitch = useCallback((id: string) => {
    return () => setCurVaultId?.(id);
  }, [setCurVaultId]);

  const colDefs = [
    columnHelper.accessor('id', {
      header: t('vault-table.header.id'),
    }),
    columnHelper.display({
      id: 'is-selected',
      cell: (props) =>
        props.row.getValue('id') === curVaultId ? (
          <CheckCircleIcon className="w-5 h-5 text-light-accent" />
        ) : null,
    }),
    columnHelper.accessor('name', {
      header: t('vault-table.header.name'),
      cell: (props) => (
        <div className="text-dark-shades">{props.getValue()}</div>
      ),
    }),
    columnHelper.accessor('currency', {
      header: t('vault-table.header.currency'),
    }),
    columnHelper.accessor('createdDate', {
      header: t('vault-table.header.createdDate'),
      cell: (props) => (
        <div className="whitespace-nowrap">{formatDate(props.getValue())}</div>
      ),
    }),
    columnHelper.accessor('updatedDate', {
      header: t('vault-table.header.updatedDate'),
      cell: (props) => (
        <div className="whitespace-nowrap">{formatDate(props.getValue())}</div>
      ),
    }),
    columnHelper.display({
      id: 'select-vault',
      cell: (props) => (
        <Button
          onClick={createHandleOnVaultSwitch(props.row.getValue('id'))}
          className="text-light-accent"
        >
          {t('vault-table.button.switch')}
        </Button>
      ),
    }),
  ];

  return <Table data={data?.getVaults ?? []} colDefs={colDefs} />;
};
