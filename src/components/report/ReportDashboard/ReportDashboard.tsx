import {
  Basis,
  ReportData,
  ReportDateGroupBy,
  useGetReportsBalanceQuery,
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

export enum DataVariant {
  BREAKDOWN = 'BREAKDOWN',
  NET = 'NET',
  COUNT = 'COUNT',
}

export const ReportDashboard: React.FC = () => {
  const { t } = useTranslation('report');
  const [{ curVaultId }] = useVaultContext();

  const [accountingBasis, setAccountingBasis] = useState<Basis>(Basis.ACCRUAL);
  const [reportDateGroupBy, setReportDateGroupBy] = useState<ReportDateGroupBy>(
    ReportDateGroupBy.MONTH
  );
  const [dataVariant, setDataVariant] = useState<DataVariant>(
    DataVariant.BREAKDOWN
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

  const handleOnDataVariantChange = useCallback(
    (value: DataVariant) => {
      setDataVariant(value);
    },
    [setDataVariant]
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

  const dataVariantOptions = useMemo(
    () =>
      [DataVariant.BREAKDOWN, DataVariant.NET, DataVariant.COUNT].map(
        (variant) => ({
          label: t(`ReportDashboard.radio.options.variant.${variant}`),
          value: variant,
        })
      ),
    [t]
  );

  const { data: reportData, error } = useGetReportsBalanceQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
        basis: accountingBasis,
        groupBy: reportDateGroupBy,
      },
    },
    fetchPolicy: 'network-only',
    skip: curVaultId == null,
  });

  console.log(reportData)

  const reportDataMappings = useMemo(() => {
    const mappings = new Map<string, ReportData>();

    reportData?.getReportsBalance.forEach((data) => {
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
          options={dataVariantOptions}
          onChange={handleOnDataVariantChange}
          label={t`ReportDashboard.radio.label.variant`}
        />
        <RadioGroup
          options={[
            { label: 'Change', value: '3' },
            { label: 'Balance', value: '4' },
          ]}
          label="ACCOUNTING BASIS"
        />
      </div>
      {reportDateGroupBy == 'MONTH' ? (
        <ReportByMonthTable
          reportDataMappings={reportDataMappings}
          variant={dataVariant}
        />
      ) : reportDateGroupBy == 'QUARTER' ? (
        <ReportByQuarterTable
          reportDataMappings={reportDataMappings}
          variant={dataVariant}
        />
      ) : (
        <ReportByYearTable
          reportDataMappings={reportDataMappings}
          basis={accountingBasis}
          variant={dataVariant}
        />
      )}
    </div>
  );
};
