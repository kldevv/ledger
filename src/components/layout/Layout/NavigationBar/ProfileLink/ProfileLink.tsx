import Link from "next/link";

export const ProfileLink: React.FC = () => {
  return (
    <Link href="/profile" className="flex py-3 px-6 -mx-6 hover:bg-midGray">
      <div className="font-semibold leading-6 text-sm flex text-darkShades">
        Kuan-you Lin
        <span className="text-">USD Wallet</span>
      </div>
    </Link>
  );
}