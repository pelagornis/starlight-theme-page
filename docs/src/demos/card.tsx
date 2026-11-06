import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardHeaderMain,
  CardTitle,
  Grid,
  Text,
} from "@pelagornis/page/components";

export default function CardDemo() {
  return (
    <Grid minItem="foundationSize2560" gap="sizeMedium" className="w-full">
      <Card>
        <CardHeader>
          <CardHeaderMain>
            <CardTitle>Getting started</CardTitle>
            <CardDescription>Install the theme and register the plugin.</CardDescription>
          </CardHeaderMain>
          <CardAction>
            <Badge variant="success">5 min</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Text variant="bodySm">Header, sidebar, search, and footer come from RefineUI.</Text>
        </CardContent>
        <CardFooter>
          <Button variant="primary" size="sm">
            Read guide
          </Button>
        </CardFooter>
      </Card>
      <Card variant="outlined" interactive>
        <CardHeader>
          <CardTitle>Outlined</CardTitle>
          <CardDescription>Interactive cards react to hover and press.</CardDescription>
        </CardHeader>
      </Card>
    </Grid>
  );
}
