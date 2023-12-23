import { GetAccountsQuery } from "@/api/graphql";
import { FormattedDate, Table, ViewLink } from "@/components/common"
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslation } from "next-i18next";

export type AccountTableData = GetAccountsQuery['getAccounts'][number]

export interface AccountTableProps {
  /**
   * Data
   */
  data: AccountTableData[]
}

const columnHelper = createColumnHelper<AccountTableData>();

export const AccountTable: React.FC<AccountTableProps> = ({ data }) => {
  const { t } = useTranslation('account');

  const colDefs = [
    columnHelper.accessor('id', {
      header: t('AccountTable.header.id'),
    }),
    columnHelper.accessor('name', {
      header: t('AccountTable.header.name'),
      cell: (props) => (
        <span className="text-dark-shades">{props.getValue()}</span>
      ),
    }),
    columnHelper.accessor('category.name', {
      header: t('AccountTable.header.category'),
    }),
    columnHelper.accessor('createdDate', {
      header: t('AccountTable.header.createdDate'),
      cell: (props) => <FormattedDate dateTime={props.getValue()}/>
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