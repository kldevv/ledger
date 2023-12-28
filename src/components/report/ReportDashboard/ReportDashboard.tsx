import { AccountsContextProvider } from '@/hooks';
import { ChangesReport } from '../ChangesReport';

export const ReportDashboard: React.FC = () => {
  return (
    <AccountsContextProvider>
      <ChangesReport />
    </AccountsContextProvider>
  );
};
