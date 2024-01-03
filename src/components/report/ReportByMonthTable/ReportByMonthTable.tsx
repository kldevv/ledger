import { ReportData } from '@/api/graphql';
import { FormattedNumber } from '@/components/common';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';
import { AccountTopologyTable, columnHelper } from '..';

export interface ReportByMonthTableProps {
  /**
   * Report data mappings
   */
  reportDataMappings: Map<string, ReportData>;
}

export const ReportByMonthTable: React.FC<ReportByMonthTableProps> = ({
  reportDataMappings,
}) => {
  const { t } = useTranslation('report');

  const colDefs = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, index) => {
        const month = index + 1;

        return columnHelper.group({
          id: String(month),
          header: () => (
            <span className="text-light-accent font-semibold">
              {t(`ReportByMonthTable.header.${month}`)}
            </span>
          ),
          columns: [
            columnHelper.accessor('id', {
              header: t`ReportByMonthTable.header.subheader.debit`,
              id: `${month}.debit`,
              cell: ({ getValue, row }) => (
                <FormattedNumber
                  className={row.depth < 2 ? 'border-b' : undefined}
                  value={
                    reportDataMappings.get(`${getValue()}::${month}`)?.debit ??
                    0
                  }
                />
              ),
            }),
            columnHelper.accessor('id', {
              header: t`ReportByMonthTable.header.subheader.credit`,
              id: `${month}.credit`,
              cell: ({ getValue, row }) => (
                <FormattedNumber
                  className={row.depth < 2 ? 'border-b' : undefined}
                  value={
                    reportDataMappings.get(`${getValue()}::${month}`)?.credit ??
                    0
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