import { useState } from "react";
import {
  ProgressStepper,
  ProgressStepperItem,
  ProgressStepperLabel,
  ProgressStepperList,
  ProgressStepperMarker,
} from "@pelagornis/page/components";

const steps = ["Account", "Profile", "Complete"];

export default function ProgressStepperDemo() {
  const [step, setStep] = useState(2);

  return (
    <ProgressStepper value={step} onValueChange={setStep} className="w-full">
      <ProgressStepperList>
        {steps.map((label, index) => (
          <ProgressStepperItem key={label} value={index + 1}>
            <ProgressStepperMarker />
            <ProgressStepperLabel>{label}</ProgressStepperLabel>
          </ProgressStepperItem>
        ))}
      </ProgressStepperList>
    </ProgressStepper>
  );
}
