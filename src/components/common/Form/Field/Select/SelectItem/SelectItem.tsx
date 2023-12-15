import { Item, ItemText } from '@radix-ui/react-select';

export interface SelectItemProps {
  /**
   * Item value
   */
  value: string
  /**
   * Item label
   */
  label: string
}

export const SelectItem: React.FC<SelectItemProps> = ({ value, label }) => {
  return (
    <Item
      className="text-sm leading-6 min-w-full text-dark-shades rounded flex items-center gap-x-2 py-1.5 px-3 relative select-none data-[disabled]:text-gray data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-light-accent data-[highlighted]:text-light-shades"
      value={value}
    >
      <ItemText className='w-full'>{label}</ItemText>
    </Item>
  );
};