import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { Listbox } from '@headlessui/react';
import { Fragment } from 'react';
import classNames from 'classnames';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { Label } from '../Label';

export interface ListBoxProps<TFieldValues extends FieldValues> {
  /**
   * Select name
   */
  name: Path<TFieldValues>;
  /**
   * Select items
   */
  options: {value: string, label: string}[];
  /**
   * Select label
   */
  label: string;
  /**
   * Optional control to explicitly set `react-hook-form` control
   */
  control?: Control<TFieldValues>;
}

const BUTTON_CN = classNames(
  'py-1.5 px-3',
  'w-full min-w-[10rem]',
  'flex items-center',
  'rounded-md border border-mid-gray text-dark-shades',
  'font-normal text-sm leading-6',
  'data-[placeholder]:text-gray',
  'focus:outline-light-accent focus:outline focus:bg-light-accent-halo'
);

const OPTION_CN = classNames(
  'gap-x-2 py-1.5 px-3',
  'text-sm leading-6 text-dark-shades',
  'min-w-full flex items-center',
  'rounded'
);

export const ListBox = <TFieldValues extends FieldValues>({
  name,
  control,
  options,
  label,
}: ListBoxProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
    control,
  });

  return (
    <div className="max-w-xs flex flex-col my-2">
      <Listbox {...field} as="div">
        {({ open }) => (
          <>
            <Listbox.Label as={Fragment}>
              <Label htmlFor={`listbox-${name}`}>{label}</Label>
            </Listbox.Label>
            <Listbox.Button className={BUTTON_CN} id={`listbox-${name}`}>
              <div className="min-h-[30px] flex items-center relative w-full gap-2">
                <span className="mr-[1.75rem] whitespace-nowrap overflow-hidden overflow-ellipsis text-left">
                  {field.value}
                </span>
                <div className="absolute right-1 text-gray">
                  {open ? (
                    <ChevronUpIcon className="w-5 h-5" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5" />
                  )}
                </div>
              </div>
            </Listbox.Button>
            <Listbox.Options className="shadow-md shadow-gray rounded-md p-1 absolute bg-white min-w-[10rem] w-fit">
              {options.map(({ value, label }) => (
                <Listbox.Option
                  key={`${value}:${label}`}
                  value={value}
                  as={Fragment}
                >
                  {({ active }) => (
                    <li
                      className={classNames(
                        OPTION_CN,
                        active ? 'bg-light-accent text-light-shades' : undefined
                      )}
                    >
                      {label}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </>
        )}
      </Listbox>
    </div>
  );
};
