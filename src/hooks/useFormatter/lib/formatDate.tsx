import { useTranslation } from "next-i18next";

export const formatDate = (props: Date) => {
  const { t } = useTranslation('hook')

  const year = props.getFullYear();
  const month = props.getMonth() + 1;
  const date = props.getDate();

  return t('date', {
    year,
    month,
    date,
  })
};
