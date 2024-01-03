import { Basis, ReportData, useGetMinMaxDateQuery } from '@/api/graphql';
import { FormattedNumber } from '@/components/common';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';
import { AccountTopologyTable, columnHelper } from '..';
import { useVaultContext } from '@/hooks';

export interface ReportByYearTableProps {
  /**
   * Report data mappings
   */
  reportDataMappings: Map<string, ReportData>;
  /**
   * Basis
   */
  basis: Basis
}

export const ReportByYearTable: React.FC<ReportByYearTableProps> = ({
  reportDataMappings,
  basis,
}) => {
  const { t } = useTranslation('report');
  const [{ curVaultId }] = useVaultContext();

  const { data } = useGetMinMaxDateQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
        basis,
      },
    },
    skip: curVaultId == null,
  });

  const [minYear, maxYear] = useMemo(() => {
    const dates = data?.getMinMaxDate;

    const curYear = new Date().getFullYear();

    return [
      dates?.minDate?.getFullYear() ?? curYear,
      dates?.maxDate?.getFullYear() ?? curYear,
    ];
  }, [data]);

  const colDefs = useMemo(
    () =>
      Array.from({ length: maxYear - minYear + 1 }).map((_, index) => {
        const year = minYear + index;

        return columnHelper.group({
          id: String(year),
          header: () => (
            <span className="text-light-accent font-semibold">{year}</span>
          ),
          columns: [
            columnHelper.accessor('id', {
              header: t`ReportByYearTable.header.subheader.debit`,
              id: `${year}.debit`,
              cell: ({ getValue, row }) => (
                <FormattedNumber
                  className={row.depth < 2 ? 'border-b' : undefined}
                  value={
                    reportDataMappings.get(`${getValue()}::${year}`)?.debit ?? 0
                  }
                />
              ),
            }),
            columnHelper.accessor('id', {
              header: t`ReportByYearTable.header.subheader.credit`,
              id: `${year}.credit`,
              cell: ({ getValue, row }) => (
                <FormattedNumber
                  className={row.depth < 2 ? 'border-b' : undefined}
                  value={
                    reportDataMappings.get(`${getValue()}::${year}`)?.credit ??
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
