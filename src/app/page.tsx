import { Box, Grid, Stack } from "@mui/material";

import { WeeklyProgressCard } from "@/components/weeklyProgressCard";

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
        <Stack>
          <WeeklyProgressCard />
          <Grid>
            {/** Current progress cards */}
          </Grid>
        </Stack>
      </Box>
    </main>
  );
}
