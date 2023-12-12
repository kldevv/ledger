import { GetAccountsQuery, useGetAccountsQuery } from "@/api/graphql";
import { Table } from "@/components/common"
import { useVaultContext } from "@/hooks";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { useTranslation } from "react-i18next";

type AccountTableData = GetAccountsQuery['getAccounts'][0]

const columnHelper = createColumnHelper<AccountTableData>();

export const AccountTable: React.FC = () => {
  const { t } = useTranslation('account');
  const [{ curVaultId }] = useVaultContext();

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

  console.log(data);

  const colDefs = [
    columnHelper.accessor('id', {
      header: t('account-table.header.id'),
    }),
    columnHelper.accessor('name', {
      header: t('account-table.header.name'),
      cell: (props) => <span className="text-dark-shades">{props.getValue()}</span>
    }),
    columnHelper.accessor('category.name', {
      header: t('account-table.header.category'),
    }),
    columnHelper.display({
      id: 'detail',
      cell: (props) => (
        <Link
          href={`/account/${props.row.getValue('id')}`}
          className="text-light-accent"
        >
          View
        </Link>
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