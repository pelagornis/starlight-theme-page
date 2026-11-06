import { Field, FieldError, FieldHint, FieldLabel, FieldRequired, Input, Stack } from "@pelagornis/page/components";

export default function FieldDemo() {
  return (
    <Stack gap="sizeLarge" className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="field-email">Email address</FieldLabel>
        <Input id="field-email" type="email" placeholder="you@example.com" fullWidth />
        <FieldHint>We never share your email.</FieldHint>
      </Field>
      <Field>
        <FieldLabel htmlFor="field-password">
          Password <FieldRequired />
        </FieldLabel>
        <Input id="field-password" type="password" error fullWidth />
        <FieldError>Password is required.</FieldError>
      </Field>
    </Stack>
  );
}
