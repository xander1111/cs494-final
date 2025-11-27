import { Box, Grid, Stack } from "@mui/material";

import { WeeklyProgressCard } from "@/components/weeklyProgressCard";
import { ProgressCard } from "@/components/progressCard";

export default function Home() {
  return (
    <main>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 4rem)',
        marginTop: '4rem',
      }}>
        <Stack direction='row' width='100%' height='calc(100vh - 4rem)' justifyContent='space-evenly'>
          <WeeklyProgressCard />
          <Grid container spacing={2} width={'35%'}>
            <Grid size={6}><ProgressCard type='Edges' /></Grid>
            <Grid size={6}><ProgressCard type='Corners' /></Grid>
            <Grid size={6}><ProgressCard type='Letter Pairs' /></Grid>
            <Grid size={6}><ProgressCard type='Overall' /></Grid>
          </Grid>
        </Stack>
      </Box>
    </main>
  );
}
