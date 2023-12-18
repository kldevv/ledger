import { GetAccountsQuery } from "@/api/graphql";
import { Table, ViewLink } from "@/components/common"
import { useFormatter } from "@/hooks";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

export type AccountTableData = GetAccountsQuery['getAccounts'][0]

export interface AccountTableProps {
  /**
   * Data
   */
  data: AccountTableData[]
}

const columnHelper = createColumnHelper<AccountTableData>();

export const AccountTable: React.FC<AccountTableProps> = ({ data }) => {
  const { t } = useTranslation('account');
  const { formatDate } = useFormatter()

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

  return (
    <Table data={data} colDefs={colDefs} />
  );
}