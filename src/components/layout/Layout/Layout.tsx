import Head from "next/head";
import classNames from "classnames";
import { UrlObject } from "url"

import { NavBar, BackLink } from "@/components/layout";

type LayoutProps = {
  /**
   * Page title in the HTTP head element
   */
  title?: string;
  /**
   * Route to go back to
   */
  prev?: string | UrlObject;
  /**
   * Children component
   */
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ title, children, prev }) => {
  return (
    <div>
      <Head>
        <title>
          {title || process.env.DEFAULT_PAGE_TITLE || 'The Ledger Page'}
        </title>
      </Head>
      <div className="min-h-screen flex min-w-full">
        <NavBar />
        <main className="w-full max-h-screen overflow-auto">
          <div
            className={classNames(
              'mx-16',
              prev != null ? 'mt-5 mb-14' : 'my-14',
              'flex flex-col gap-y-5',
              'min-w-min'
            )}
          >
            {prev != null && <BackLink href={prev} />}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};