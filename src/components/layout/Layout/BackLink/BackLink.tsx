import { ChevronLeftIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { UrlObject } from "url";

export type BackButtonProps = {
  /**
   * Route to go back to
   */
  href: string | UrlObject;
};

export const BackLink: React.FC<BackButtonProps> = ({ href }) => {
  return (
    <Link href={href} className="-ml-5">
      <div className="text-darkMidGray flex items-center gap-x-1 font-normal text-sm h-4">
        <ChevronLeftIcon className="w-4 h-4" />
        {href === '/' ? 'Home' : 'Back'}
      </div>
    </Link>
  );
};