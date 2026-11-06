import { Fragment, useState } from "react";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperList,
  StepperSeparator,
  StepperTitle,
} from "@pelagornis/page/components";

const steps = [
  { title: "Install", description: "Add the package" },
  { title: "Configure", description: "Register the plugin" },
  { title: "Write", description: "Add pages" },
];

export default function StepperDemo() {
  const [step, setStep] = useState(1);

  return (
    <Stepper value={step} onValueChange={setStep} className="w-full">
      <StepperList>
        {steps.map((item, index) => (
          <Fragment key={item.title}>
            {index > 0 && <StepperSeparator />}
            <StepperItem value={index}>
              <StepperIndicator>{index + 1}</StepperIndicator>
              <StepperTitle>{item.title}</StepperTitle>
              <StepperDescription>{item.description}</StepperDescription>
            </StepperItem>
          </Fragment>
        ))}
      </StepperList>
    </Stepper>
  );
}
