import { useFieldArray } from 'react-hook-form';
import { FieldValues } from '..';
import { Row } from './Row';
import { MinusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/common';

export const EntryField: React.FC = () => {
  const { fields, append, remove } = useFieldArray<FieldValues>({
    name: 'entries',
  });

  return (
    <div className="flex flex-col gap-y-3">
      {fields.map((field, index) => (
        <div>
          <span className="leading-6 text-light-accent text-[0.5rem] font-semibold -mb-3">
            {`ENTRY #${index + 1}`}
          </span>
          <Row
            index={index}
            key={field.id}
            append={index === fields.length - 1 ? append : null}
            remove={fields.length > 2 ? remove : null}
          />
        </div>
      ))}
    </div>
  );
};
