import type { AppType } from 'next/app';

import { appWithI18Next } from 'ni18n';
import { ni18nConfig } from '../../ni18n.config';

const App: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default appWithI18Next(App, ni18nConfig)
