import { Basis, useGetMonthlyReportsQuery } from '@/api/graphql';
import { useVaultContext } from '@/hooks';
import { AccountTopologyTable } from '..';
import { useCallback, useState } from 'react';
import { RadioGroup } from '@/components/common';

export const ChangesReport: React.FC = () => {
  const [{ curVaultId }] = useVaultContext();
  const [ isAccrualBasis, setIsAccrualBasis ] = useState(true)

  const { data, error } = useGetMonthlyReportsQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
        year: 2023,
        basis: isAccrualBasis ? Basis.ACCRUAL : Basis.CASH
      },
    },
    skip: curVaultId == null,
  });

  const handleOnChange = useCallback(() => {
    setIsAccrualBasis((prev) => !prev);
  }, [setIsAccrualBasis]);

  return (
    <div>
      <RadioGroup
        options={[
          { label: 'Accrual', value: '1' },
          { label: 'Cash', value: '0' },
        ]}
        label="ACCOUNTING BASIS"
        onChange={handleOnChange}
      />
      <AccountTopologyTable reportData={data?.getMonthlyReports ?? []} />
    </div>
  );
};