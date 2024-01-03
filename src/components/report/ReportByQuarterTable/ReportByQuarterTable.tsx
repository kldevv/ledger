import { ReportData } from '@/api/graphql';
import { FormattedNumber } from '@/components/common';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';
import { AccountTopologyTable, columnHelper } from '..';

export interface ReportByQuarterTableProps {
  /**
   * Report data mappings
   */
  reportDataMappings: Map<string, ReportData>;
}

export const ReportByQuarterTable: React.FC<ReportByQuarterTableProps> = ({
  reportDataMappings,
}) => {
  const { t } = useTranslation('report');

  const colDefs = useMemo(
    () =>
      Array.from({ length: 4 }).map((_, index) => {
        const quarter = index + 1;

        return columnHelper.group({
          id: String(quarter),
          header: () => (
            <span className="text-light-accent font-semibold">
              {t(`ReportByQuarterTable.header.${quarter}`)}
            </span>
          ),
          columns: [
            columnHelper.accessor('id', {
              header: t`ReportByQuarterTable.header.subheader.debit`,
              id: `${quarter}.debit`,
              cell: ({ getValue, row }) => (
                <FormattedNumber
                  className={row.depth < 2 ? 'border-b' : undefined}
                  value={
                    reportDataMappings.get(`${getValue()}::${quarter}`)
                      ?.debit ?? 0
                  }
                />
              ),
            }),
            columnHelper.accessor('id', {
              header: t`ReportByQuarterTable.header.subheader.credit`,
              id: `${quarter}.credit`,
              cell: ({ getValue, row }) => (
                <FormattedNumber
                  className={row.depth < 2 ? 'border-b' : undefined}
                  value={
                    reportDataMappings.get(`${getValue()}::${quarter}`)
                      ?.credit ?? 0
                  }
                />
              ),
            }),
          ],
        });
      }),
    [t, reportDataMappings]
  );

  return <AccountTopologyTable cols={colDefs} />;
};
