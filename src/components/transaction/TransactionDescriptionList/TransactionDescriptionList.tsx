import { Card, StatusChip } from "@/components/common"

export const TransactionDescriptionList: React.FC = () => {
  return (
    <Card>
      <div className="w-full">
        <dl>
          <div className="py-2 items-center grid grid-cols-2 gap-x-8">
            <dt>
              <div className="text-sm text-darkShades">Accrual Date</div>
            </dt>
            <dd>
              <div className="max-w-xs text-sm font-light leading-6 text-darkMidGray">
                John
              </div>
            </dd>
          </div>
          <div className="py-2 border-t items-center grid grid-cols-2 gap-x-8 border-t-midGray">
            <dt>
              <div className="text-sm text-darkShades">Balance Changes</div>
            </dt>
            <dd>
              <div className="max-w-xs text-sm font-light leading-6 text-darkMidGray">
                A -100 L +80 E +20
              </div>
            </dd>
          </div>
          <div className="py-2 border-t items-center grid grid-cols-2 gap-x-8 border-t-midGray">
            <dt>
              <div className="text-sm text-darkShades">ID</div>
            </dt>
            <dd>
              <div className="max-w-xs text-sm font-light leading-6 text-darkMidGray">
                #1258405
              </div>
            </dd>
          </div>
          <div className="py-2 border-t items-center grid grid-cols-2 gap-x-8 border-t-midGray">
            <dt>
              <div className="text-sm text-darkShades">Number of entries</div>
            </dt>
            <dd>
              <div className="max-w-xs text-sm font-light leading-6 text-darkMidGray">
                3
              </div>
            </dd>
          </div>
          <div className="py-2 border-t items-center grid grid-cols-2 gap-x-8 border-t-midGray">
            <dt>
              <div className="text-sm text-darkShades">Status</div>
            </dt>
            <dd>
              <div className="max-w-xs text-sm font-light leading-6 text-darkMidGray">
                <StatusChip status="COMPLETED" />
              </div>
            </dd>
          </div>
          <div className="py-2 border-t items-center grid grid-cols-2 gap-x-8 border-t-midGray">
            <dt>
              <div className="text-sm text-darkShades">Note</div>
            </dt>
            <dd>
              <div className="max-w-xs text-sm font-light leading-6 text-darkMidGray">
                NYC Subway
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </Card>
  );
}