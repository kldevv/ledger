import Head from "next/head";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";

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
        <Navigation />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};