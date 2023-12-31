import Link from "next/link";
import { UrlObject } from "url";

export type PageHeaderProps = {
  /**
   * Title
   */
  title: string;
  /**
   * Subtitle
   */
  subtitle: string;
  /**
   * Page header link
   */
  link?: {
    /**
     * Page header link href
     */
    href: string | UrlObject;
    /**
     * Page header link label
     */
    label: string;
  };
};

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, link }) => {
  return (
    <div className="grid grid-cols-3 mb-4">
      <div className="col-span-2 flex flex-col gap-y-3">
        <h1 className="text-dark-shades font-extrabold text-3xl">{title}</h1>
        <p className="text-gray text-base max-w-md">{subtitle}</p>
      </div>
      {link && (
        <div className="items-end flex justify-end">
          <Link
            href={link.href}
            className="max-w-max text-xs leading-6 font-semibold bg-light-accent text-light-shades py-1 px-3 rounded-md my-2 whitespace-nowrap"
          >
            {link.label}
          </Link>
        </div>
      )}
    </div>
  );
};