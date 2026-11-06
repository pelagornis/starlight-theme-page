import { useState } from "react";
import { Calendar } from "@pelagornis/page/components";

export default function CalendarDemo() {
  const [date, setDate] = useState(() => new Date());

  return <Calendar value={date} onChange={setDate} weekStartsOn={1} />;
}
