import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link"

export const AddWalletCard = () => {
  return (
    <Link
      href="/wallet/add"
      className="bg-midGray text-darkMidGray rounded-md h-16 max-w-sm flex items-center hover:bg-darkMidGray hover:text-darkShades"
    >
      <PlusCircleIcon className="w-8 h-8 mx-auto" />
    </Link>
  );
}