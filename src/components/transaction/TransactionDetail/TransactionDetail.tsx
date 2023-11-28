import { useRouter } from "next/router";
import { InfoSheet } from "./InfoSheet/InfoSheet"

const getData = (id: string) => {
  return {
    id,
    accrualDate: new Date(),
    description: 'Buying a Ferrari',
    tags: ['clothes', 'denver'],
  }
};

export const TransactionDetail = () => {
  const {
    query: { id },
  } = useRouter();

  const data = getData(Array.isArray(id) ? id[0] : id ?? '0')
  
  return <div><InfoSheet data={data}/></div>
}