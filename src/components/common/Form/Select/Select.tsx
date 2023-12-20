import { Control, FieldValues, Path, useController } from 'react-hook-form';
import classNames from 'classnames';
import {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Content,
  ScrollUpButton,
  ScrollDownButton,
  Viewport,
  SelectProps as RadixSelectProps,
} from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { SelectItem, SelectItemProps } from './SelectItem';
import { useMemo, useState } from 'react';
import React from 'react';
import { Field } from '../Field';

export interface SelectProps<TFieldValues extends FieldValues>
  extends Omit<RadixSelectProps, 'children' | 'required' | 'value'> {
  /**
   * Select label
   */
  label: string;
  /**
   * Select name
   */
  name: Path<TFieldValues>;
  /**
   * Select items
   */
  items: SelectItemProps[];
  /**
   * Select placeholder
   */
  placeholder?: string;
  /**
   * Customize class name for the trigger
   */
  className?: string;
  /**
   * Optional control to explicitly set `react-hook-form` control
   */
  control?: Control<TFieldValues>;
}

export const Select = <TFieldValues extends FieldValues>({
  name,
  label,
  items,
  onValueChange,
  placeholder = '',
  className,
  control,
  ...props
}: SelectProps<TFieldValues>) => {
  const {
    field: { value, onChange },
  } = useController<TFieldValues>({
    name,
    control,
  });

  const [open, setOpen] = useState(false);

  const triggerCn = useMemo(
    () =>
      classNames(
        'py-1.5 px-3',
        'w-full min-w-[10rem]',
        'flex items-center',
        'rounded-md border border-mid-gray text-dark-shades',
        'font-normal text-sm leading-6',
        'data-[placeholder]:text-gray',
        'focus:outline-light-accent focus:outline focus:bg-light-accent-halo',
        className
      ),
    [className]
  );

  const htmlFor = useMemo(() => `select-id-${name}`, [name]);

  const handleOnValueChange = (value: string) => {
    onChange(value);
    onValueChange?.(value);
  };

  return (
    <Field htmlFor={htmlFor} label={label} name={name}>
      <Root
        {...props}
        onValueChange={handleOnValueChange}
        onOpenChange={setOpen}
        name={name}
        value={value ?? ''}
      >
        <Trigger className={triggerCn} id={htmlFor}>
          <div className="min-h-[30px] flex items-center relative w-full gap-2">
            <span className="mr-[1.75rem] whitespace-nowrap overflow-hidden overflow-ellipsis text-left">
              <Value placeholder={placeholder} />
            </span>
            <Icon className="absolute right-1">
              {open ? (
                <ChevronUpIcon className="w-3 h-3" />
              ) : (
                <ChevronDownIcon className="w-3 h-3" />
              )}
            </Icon>
          </div>
        </Trigger>
        <Portal>
          <Content
            className="overflow-hidden w-full bg-light-shades rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
            position="popper"
          >
            <ScrollUpButton className="flex items-center justify-center h-[25px] bg-light-shades text-dark-shades cursor-default">
              <ChevronUpIcon />
            </ScrollUpButton>
            <Viewport className="p-1 w-full">
              {items.map(({ value, label }) => (
                <SelectItem key={value} value={value} label={label} />
              ))}
            </Viewport>
            <ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
              <ChevronDownIcon />
            </ScrollDownButton>
          </Content>
        </Portal>
      </Root>
    </Field>
  );
};
