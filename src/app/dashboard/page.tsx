import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";

import data from "./data.json";
import { SectionCardComponent, SectionCards } from "@/components/section-card";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards>
              <SectionCardComponent
                title="Total Revenue"
                description="Visitors for the last 6 months"
                value="$1,250.00"
                trend="up"
                trendValue="+12.5%"
                trendDescription="Trending up this month"
              />
              <SectionCardComponent
                title="New Customers"
                description="Acquisition needs attention"
                value="1,234"
                trend="down"
                trendValue="-20%"
                trendDescription="Down 20% this period"
              />
              <SectionCardComponent
                title="Active Accounts"
                value="45,678"
                trend="up"
                trendValue="+12.5%"
                description="Engagement exceed targets"
                trendDescription="Strong user retention"
              />
              <SectionCardComponent
                title="Growth Rate"
                value="4.5%"
                trend="up"
                trendValue="+4.5%"
                description="Meets growth projections"
                trendDescription="Steady performance increase"
              />
            </SectionCards>
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
