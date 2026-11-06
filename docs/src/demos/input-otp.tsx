import { useState } from "react";
import { InputOTP, InputOTPSlot, Stack, Text } from "@pelagornis/page/components";

export default function InputOTPDemo() {
  const [code, setCode] = useState("");

  return (
    <Stack gap="sizeSmall" align="center">
      <InputOTP maxLength={6} value={code} onValueChange={setCode} pattern={/\d/} aria-label="Verification code">
        {Array.from({ length: 6 }, (_, index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTP>
      <Text variant="captionMd">Code: {code || "—"}</Text>
    </Stack>
  );
}
