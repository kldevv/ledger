import { useTranslation } from "react-i18next";

export type InfoSheetProps = {
  /**
   * Transaction data.
   */
  data: Record<string, any>
}

export const InfoSheet: React.FC<InfoSheetProps> = ({ data }) => {
  const { t } = useTranslation('transaction')

  return (
    <div>
      <div>
        <span>{t`detail.infoSheet.label.id`}</span>
        <span>{data.id}</span>
      </div>
      <div>
        <span>{t`detail.infoSheet.label.description`}</span>
        <span>{data.description}</span>
      </div>
    </div>
  );
}