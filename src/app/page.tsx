import { Grid, Stack } from "@mui/material";

import BarChartIcon from '@mui/icons-material/BarChart';
import TextFieldsIcon from '@mui/icons-material/TextFields';

import { WeeklyProgressCard } from "@/components/weeklyProgressCard";
import { ProgressCard } from "@/components/progressCard";
import { CornerGridIcon } from "@/components/cornerGridIcon";
import { EdgeGridIcon } from "@/components/edgeGridIcon";

export default function Home() {
  return (
    <Stack direction='row' width='100%' height='calc(100vh - 4rem)' justifyContent='space-evenly'>
      <WeeklyProgressCard />
      <Grid container spacing={2} width={'35%'}>
        <Grid size={6}>
          <ProgressCard
            type='Corners'
            color='secondary'
            icon={<CornerGridIcon sx={{ fontSize: '100%', width: '50%', height: '50%' }} />}
            href='corners'
          />
        </Grid>
        <Grid size={6}>
          <ProgressCard
            type='Edges'
            color='primary'
            icon={<EdgeGridIcon sx={{ fontSize: '100%', width: '50%', height: '50%' }} />}
            href='/edges'
          />
        </Grid>
        <Grid size={6}>
          <ProgressCard
            type='Letter Pairs'
            color='success'
            icon={<TextFieldsIcon sx={{ fontSize: '100%', width: '50%', height: '50%' }} />}
            href='/letterPairs'
          />
        </Grid>
        <Grid size={6}>
          <ProgressCard
            type='Overall'
            color='error'
            icon={<BarChartIcon sx={{ fontSize: '100%', width: '50%', height: '50%' }} />}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
