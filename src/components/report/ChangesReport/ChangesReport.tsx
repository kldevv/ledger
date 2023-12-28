import { useGetMonthlyReportsQuery } from "@/api/graphql"
import { useVaultContext } from "@/hooks"

export const ChangesReport: React.FC = () => {
  const [{ curVaultId }] = useVaultContext()

  const { data, error } = useGetMonthlyReportsQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
        year: 2023
      },
    },
    skip: curVaultId == null,
  });

  console.log(data, error);
  
  return null
}