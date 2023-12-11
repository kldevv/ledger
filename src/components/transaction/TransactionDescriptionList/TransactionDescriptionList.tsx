import { Card, StatusChip } from "@/components/common"

export const TransactionDescriptionList: React.FC = () => {
  return (
    <Card>
      <div className="w-full">
        <dl>
          <div className="py-2 items-center grid grid-cols-2 gap-x-8">
            <dt>
              <div className="text-sm text-dark-shades">Accrual Date</div>
            </dt>
            <dd>
              <div className="max-w-xs text-sm font-light leading-6 text-gray">
                John
              </div>
            </dd>
          </div>
          <div className="py-2 border-t items-center grid grid-cols-2 gap-x-8 border-t-mid-gray">
            <dt>
              <div className="text-sm text-dark-shades">Balance Changes</div>
            </dt>
            <dd>
              <div className="max-w-xs text-sm font-light leading-6 text-gray">
                A -100 L +80 E +20
              </div>
            </dd>
          </div>
          <div className="py-2 border-t items-center grid grid-cols-2 gap-x-8 border-t-mid-gray">
            <dt>
              <div className="text-sm text-dark-shades">ID</div>
            </dt>
            <dd>
              <div className="max-w-xs text-sm font-light leading-6 text-gray">
                #1258405
              </div>
            </dd>
          </div>
          <div className="py-2 border-t items-center grid grid-cols-2 gap-x-8 border-t-mid-gray">
            <dt>
              <div className="text-sm text-dark-shades">Number of entries</div>
            </dt>
            <dd>
              <div className="max-w-xs text-sm font-light leading-6 text-gray">
                3
              </div>
            </dd>
          </div>
          <div className="py-2 border-t items-center grid grid-cols-2 gap-x-8 border-t-mid-gray">
            <dt>
              <div className="text-sm text-dark-shades">Status</div>
            </dt>
            <dd>
              <div className="max-w-xs text-sm font-light leading-6 text-gray">
                <StatusChip status="COMPLETED" />
              </div>
            </dd>
          </div>
          <div className="py-2 border-t items-center grid grid-cols-2 gap-x-8 border-t-mid-gray">
            <dt>
              <div className="text-sm text-dark-shades">Note</div>
            </dt>
            <dd>
              <div className="max-w-xs text-sm font-light leading-6 text-gray">
                NYC Subway
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </Card>
  );
}