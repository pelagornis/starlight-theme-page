import { useState } from "react";
import { SpinButton } from "@pelagornis/page/components";

export default function SpinButtonDemo() {
  const [quantity, setQuantity] = useState(2);

  return <SpinButton value={quantity} onChange={setQuantity} min={0} max={10} aria-label="Quantity" />;
}
