import { GetAccountsQuery, useGetAccountsQuery } from "@/api/graphql";
import { Table, ViewLink } from "@/components/common"
import { useFormatter, useVaultContext } from "@/hooks";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

type AccountTableData = GetAccountsQuery['getAccounts'][0]

const columnHelper = createColumnHelper<AccountTableData>();

export const AccountTable: React.FC = () => {
  const { t } = useTranslation('account');
  const [{ curVaultId }] = useVaultContext();
  const { formatDate } = useFormatter()

  const {
    data,
    loading,
    error,
  } = useGetAccountsQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
      },
    },
    fetchPolicy: "cache-and-network",
    skip: curVaultId == null,
  });

  const colDefs = [
    columnHelper.accessor('id', {
      header: t('account-table.header.id'),
    }),
    columnHelper.accessor('name', {
      header: t('account-table.header.name'),
      cell: (props) => (
        <span className="text-dark-shades">{props.getValue()}</span>
      ),
    }),
    columnHelper.accessor('category.name', {
      header: t('account-table.header.category'),
    }),
    columnHelper.accessor('createdDate', {
      header: t('account-table.header.createdDate'),
      cell: (props) => <span>{formatDate(props.getValue())}</span>
    }),
    columnHelper.display({
      id: 'detail',
      cell: (props) => (
        <ViewLink
          href={`/account/${props.row.getValue('id')}`}
        />
      ),
    }),
  ];

  if (data == null) {
    return null
  }
  
  return (
    <Table data={data.getAccounts} colDefs={colDefs} />
  );
}