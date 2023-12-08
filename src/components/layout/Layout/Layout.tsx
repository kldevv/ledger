import Head from "next/head";
import { Footer } from "./Footer";
import { NavigationBar } from './NavigationBar';

type LayoutProps = {
  /**
   * Page title in the HTTP head element
   */
  title?: string;
  /**
   * Children elements
   */
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>
          {title || process.env.DEFAULT_PAGE_TITLE || 'The Ledger Page'}
        </title>
      </Head>
      <div className="min-h-screen flex">
        <NavigationBar />
        <main className="grow">
          <div className="my-14 mx-16 m flex flex-col gap-y-5">{children}</div>
        </main>
      </div>
    </div>
  );
};