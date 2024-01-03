import { ReportData } from '@/api/graphql';
import { FormattedNumber } from '@/components/common';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';
import { AccountTopologyTable, columnHelper } from '..';

export interface ReportByMonthTableProps {
  /**
   * Report data
   */
  reportData: ReportData[];
}

export const ReportByMonthTable: React.FC<ReportByMonthTableProps> = ({
  reportData,
}) => {
  const { t } = useTranslation('report');

  const reportDataMappings = useMemo(() => {
    const mappings = new Map<string, ReportData>();

    reportData.forEach((data) => {
      mappings.set(data.encode, data);
    });

    return mappings;
  }, [reportData]);

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
