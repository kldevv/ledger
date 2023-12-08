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
        {/* Add any other meta tags or external stylesheets here */}
      </Head>
      <div className="min-h-screen flex">
        <NavigationBar />
        <main>
          <div className="m-10 mt-14 flex flex-col gap-y-5">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
};