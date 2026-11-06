import {
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@pelagornis/page/components";

const rows = [
  { slot: "Header", component: "Command, Button", status: "Override" },
  { slot: "Sidebar", component: "Sidebar, Resizable", status: "Override" },
  { slot: "Footer", component: "Footer", status: "Override" },
  { slot: "EditLink", component: "—", status: "Starlight" },
];

export default function TableDemo() {
  return (
    <Table>
      <TableCaption>Starlight slots and the RefineUI components behind them</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Slot</TableHead>
          <TableHead>Components</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.slot}>
            <TableCell>{row.slot}</TableCell>
            <TableCell>{row.component}</TableCell>
            <TableCell>
              <Badge variant={row.status === "Override" ? "success" : "neutral"}>{row.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
