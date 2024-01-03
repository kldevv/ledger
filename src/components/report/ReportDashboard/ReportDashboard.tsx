import {
  AmountHandle,
  Basis,
  ReportData,
  ReportDateGroupBy,
  useGetReportsQuery,
} from '@/api/graphql';
import { useVaultContext } from '@/hooks';
import {
  ReportByMonthTable,
  ReportByQuarterTable,
  ReportByYearTable,
} from '..';
import { useCallback, useMemo, useState } from 'react';
import { RadioGroup } from '@/components/common';
import { useTranslation } from 'next-i18next';

export const ReportDashboard: React.FC = () => {
  const { t } = useTranslation('report');
  const [{ curVaultId }] = useVaultContext();

  const [accountingBasis, setAccountingBasis] = useState<Basis>(Basis.ACCRUAL);
  const [reportDateGroupBy, setReportDateGroupBy] = useState<ReportDateGroupBy>(
    ReportDateGroupBy.MONTH
  );

  const handleOnBasisChange = useCallback(
    (value: Basis) => {
      setAccountingBasis(value);
    },
    [setAccountingBasis]
  );

  const handleOnReportDateGroupByChange = useCallback(
    (value: ReportDateGroupBy) => {
      setReportDateGroupBy(value);
    },
    [setReportDateGroupBy]
  );

  const basisOptions = useMemo(
    () =>
      [Basis.ACCRUAL, Basis.CASH].map((basis) => ({
        label: t(`ReportDashboard.radio.options.basis.${basis}`),
        value: basis,
      })),
    [t]
  );

  const reportDateGroupByOptions = useMemo(
    () =>
      [
        ReportDateGroupBy.MONTH,
        ReportDateGroupBy.QUARTER,
        ReportDateGroupBy.YEAR,
      ].map((groupBy) => ({
        label: t(`ReportDashboard.radio.options.groupBy.${groupBy}`),
        value: groupBy,
      })),
    [t]
  );

  const { data: reportData, error } = useGetReportsQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
        basis: accountingBasis,
        amountHandle: AmountHandle.DEBIT_CREDIT,
        groupBy: reportDateGroupBy,
      },
    },
    fetchPolicy: 'network-only',
    skip: curVaultId == null,
  });

  const reportDataMappings = useMemo(() => {
    const mappings = new Map<string, ReportData>();

    reportData?.getReports.forEach((data) => {
      mappings.set(data.encode, data);
    });

    return mappings;
  }, [reportData]);

  return (
    <div>
      <div className="flex flex-col space-y-2">
        <RadioGroup
          options={basisOptions}
          onChange={handleOnBasisChange}
          label={t`ReportDashboard.radio.label.basis`}
        />
        <RadioGroup
          options={reportDateGroupByOptions}
          onChange={handleOnReportDateGroupByChange}
          label={t`ReportDashboard.radio.label.groupBy`}
        />
        <RadioGroup
          options={[
            { label: 'All', value: '4' },
            { label: 'Completed', value: '3' },
            { label: 'Pending', value: '2' },
          ]}
          label="ACCOUNTING BASIS"
        />
        <RadioGroup
          options={[
            { label: 'Change', value: '3' },
            { label: 'Balance', value: '4' },
          ]}
          label="ACCOUNTING BASIS"
        />
        <RadioGroup
          options={[
            { label: 'Breakdown', value: '4' },
            { label: 'Net Debit', value: '3' },
            { label: 'Count', value: '2' },
          ]}
          label="ACCOUNTING BASIS"
        />
      </div>
      {reportDateGroupBy == 'MONTH' ? (
        <ReportByMonthTable reportDataMappings={reportDataMappings} />
      ) : reportDateGroupBy == 'QUARTER' ? (
        <ReportByQuarterTable reportDataMappings={reportDataMappings} />
      ) : (
        <ReportByYearTable
          reportDataMappings={reportDataMappings}
          basis={accountingBasis}
        />
      )}
    </div>
  );
};
