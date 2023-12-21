import { useFieldArray } from 'react-hook-form';
import { FieldValues } from '..';
import { Row } from './UpsertEntryTable.Row';
import { useTranslation } from 'next-i18next';

export const UpsertEntryTable: React.FC = () => {
  const { t } = useTranslation('transaction')

  const { fields, append, remove } = useFieldArray<FieldValues>({
    name: 'entries',
  });

  return (
    <div className="flex flex-col gap-y-3">
      {fields.map((field, index) => (
        <div key={field.id}>
          <span className="leading-6 text-light-accent text-[0.5rem] font-semibold -mb-3">
            {t('UpsertTransactionForm.title', {
              index: index + 1,
            })}
          </span>
          <Row
            index={index}
            // The last table row will be have a button to append more
            append={index === fields.length - 1 ? append : null}
            // We will maintain at least two rows
            remove={fields.length > 2 ? remove : null}
          />
        </div>
      ))}
    </div>
  );
};
