import { Basis, useGetMonthlyReportsQuery } from '@/api/graphql';
import { useVaultContext } from '@/hooks';
import { AccountTopologyTable } from '..';
import { useCallback, useMemo, useState } from 'react';
import { RadioGroup } from '@/components/common';
import { useTranslation } from 'next-i18next';

export const ReportDashboard: React.FC = () => {
  const { t } = useTranslation('report');
  const [{ curVaultId }] = useVaultContext();

  const [accountingBasis, setAccountingBasis] = useState<Basis>(Basis.ACCRUAL);
  const handleOnBasisChange = useCallback(
    (value: Basis) => {
      setAccountingBasis(value);
    },
    [setAccountingBasis]
  );
  const basisOptions = useMemo(
    () =>
      [Basis.ACCRUAL, Basis.CASH].map((basis) => ({
        label: t(`ReportDashboard.radio.options.basis.${basis}`),
        value: basis,
      })),
    [t]
  );

  const { data, error } = useGetMonthlyReportsQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
        year: 2023,
        basis: accountingBasis,
      },
    },
    skip: curVaultId == null,
  });

  return (
    <div>
      <div className="flex flex-col space-y-2">
        <RadioGroup
          options={basisOptions}
          label={t`ReportDashboard.radio.label.basis`}
          onChange={handleOnBasisChange}
        />
        <RadioGroup
          options={[
            { label: 'Monthly', value: '4' },
            { label: 'Quarterly', value: '3' },
            { label: 'Yearly', value: '2' },
          ]}
          label="ACCOUNTING BASIS"
        />
        <RadioGroup
          options={[
            { label: 'All', value: '4' },
            { label: 'Completed', value: '3' },
            { label: 'Pending', value: '2' },
          ]}
          label="ACCOUNTING BASIS"
        />
      </div>
      <AccountTopologyTable
        reportData={data?.getMonthlyReports ?? []}
        year={2023}
      />
    </div>
  );
};
