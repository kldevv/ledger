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

export enum DataMode {
  CHANGE = 'CHANGE',
  BALANCE = 'BALANCE',
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
  const [dataMode, setDataMode] = useState<DataMode>(DataMode.CHANGE);

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

  const handleOnDataModeChange = useCallback(
    (value: DataMode) => {
      setDataMode(value);
    },
    [setDataMode]
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

  const dataModeOptions = useMemo(
    () =>
      [DataMode.CHANGE, DataMode.BALANCE].map((mode) => ({
        label: t(`ReportDashboard.radio.options.mode.${mode}`),
        value: mode,
      })),
    [t]
  );

  const { data: balanceData } = useGetReportsBalanceQuery({
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

  const { data: changeData } = useGetReportsQuery({
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

  const reportDataMappings = useMemo(() => {
    const mappings = new Map<string, ReportData>();

    if (dataMode === DataMode.BALANCE) {
      balanceData?.getReportsBalance.forEach((data) => {
        mappings.set(data.encode, data);
      });
    }

    if (dataMode === DataMode.CHANGE) {
      changeData?.getReports.forEach((data) => {
        mappings.set(data.encode, data);
      });
    }

    return mappings;
  }, [changeData, balanceData, dataMode]);

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
          options={dataModeOptions}
          onChange={handleOnDataModeChange}
          label={t`ReportDashboard.radio.label.mode`}
        />
      </div>
      {reportDateGroupBy === ReportDateGroupBy.MONTH ? (
        <ReportByMonthTable
          reportDataMappings={reportDataMappings}
          variant={dataVariant}
        />
      ) : reportDateGroupBy == ReportDateGroupBy.QUARTER ? (
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
