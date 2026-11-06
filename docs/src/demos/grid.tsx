import { Box, Grid, GridItem, Text } from "@pelagornis/page/components";

const items = ["Tokens", "Components", "Motion", "Themes", "Icons", "Layout"];

export default function GridDemo() {
  return (
    <Grid minItem="foundationSize2560" gap="sizeMedium" className="w-full">
      {items.map((item) => (
        <GridItem key={item}>
          <Box padding="sizeLarge" background="backgroundSurface" radius="roundedLarge">
            <Text variant="subtitleMd">{item}</Text>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
}
