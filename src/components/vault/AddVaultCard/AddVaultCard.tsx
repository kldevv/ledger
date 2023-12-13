import Link from "next/link"

import { PlusCircleIcon } from "@heroicons/react/24/solid";

export const AddVaultCard: React.FC = () => {
  return (
    <Link
      href="/vault/create"
      className="bg-mid-gray text-gray rounded-md h-16 max-w-sm flex items-center hover:bg-gray hover:text-dark-shades"
    >
      <PlusCircleIcon className="w-8 h-8 mx-auto" />
    </Link>
  );
}