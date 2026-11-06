import {
  Alert,
  AlertAction,
  AlertActions,
  AlertBody,
  AlertClose,
  AlertDescription,
  AlertIcon,
  AlertRow,
  AlertTitle,
  Stack,
} from "@pelagornis/page/components";

export default function AlertDemo() {
  return (
    <Stack gap="sizeMedium" className="w-full">
      <Alert variant="info">
        <AlertRow>
          <AlertIcon />
          <AlertBody>
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>The plugin injects RefineUI styles for you.</AlertDescription>
          </AlertBody>
        </AlertRow>
      </Alert>
      <Alert variant="warning">
        <AlertRow>
          <AlertIcon />
          <AlertBody>
            <AlertTitle>Review before publishing</AlertTitle>
            <AlertDescription>Two pages have no description.</AlertDescription>
          </AlertBody>
          <AlertClose type="button" />
        </AlertRow>
        <AlertActions>
          <AlertAction type="button">Review</AlertAction>
        </AlertActions>
      </Alert>
    </Stack>
  );
}
