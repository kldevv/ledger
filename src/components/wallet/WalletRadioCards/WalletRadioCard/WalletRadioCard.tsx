import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { Item, Indicator } from '@radix-ui/react-radio-group';

export type WalletRadioCardProps = {
  /**
   * Wallet name
   */
  name: string;
  /**
   * Wallet id
   */
  id: string;
  /**
   * Wallet currency
   */
  currency: string;
  /**
   * Currently selected
   */
  selected: string;
};

export const WalletRadioCard: React.FC<WalletRadioCardProps> = ({
  name,
  id,
  currency,
}) => {
  return (
    <Item
      value={id}
      className="ring-1 data-[state=checked]:ring-2 hover:ring-2 data-[state=checked]:ring-lightAccent hover:ring-lightAccent ring-darkMidGray rounded-md h-16"
    >
      <div className="mx-3 flex items-center">
        <div className="flex flex-col text-darkShades items-start">
          <p className="text-base font-bold">
            {name}
            <span className="ml-3 text-xs font-normal text-darkMidGray">
              {id}
            </span>
          </p>
          <p className="text-darkShades text-xs font-normal">{currency}</p>
        </div>
        <Indicator className="text-lightAccent ml-auto">
          <CheckCircleIcon className="w-6 h-6" />
        </Indicator>
      </div>
    </Item>
  );
};
