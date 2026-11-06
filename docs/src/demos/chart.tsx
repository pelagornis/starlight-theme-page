import {
  Chart,
  ChartAxisLabels,
  ChartBars,
  ChartBody,
  ChartContent,
  ChartGrid,
  ChartLegend,
  ChartLegendItem,
  ChartPlot,
  ChartYAxisLabels,
} from "@pelagornis/page/components";

const visits = [45, 52, 38, 65, 42, 80, 55];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ChartDemo() {
  return (
    <Chart className="w-full">
      <ChartBody>
        <ChartContent>
          <ChartYAxisLabels values={visits} />
          <ChartPlot aria-label="Weekly page visits">
            <ChartGrid values={visits} />
            <ChartBars values={visits} seriesColor="brand" />
          </ChartPlot>
          <ChartAxisLabels labels={days} />
        </ChartContent>
      </ChartBody>
      <ChartLegend>
        <ChartLegendItem seriesColor="brand">Visits</ChartLegendItem>
      </ChartLegend>
    </Chart>
  );
}
