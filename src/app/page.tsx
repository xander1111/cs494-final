'use client'

import Link from "next/link";

import { Grid, Stack, Typography } from "@mui/material";

import { useUser } from "@/contexts/userContext";

import CalculateIcon from '@mui/icons-material/Calculate';
import TextFieldsIcon from '@mui/icons-material/TextFields';

import { WeeklyProgressCard } from "@/components/weeklyProgressCard";
import { ProgressCard } from "@/components/progressCard";
import { CornerGridIcon } from "@/components/cornerGridIcon";
import { EdgeGridIcon } from "@/components/edgeGridIcon";
import StyledCard from "@/components/styledCard";
import { NavbarButton } from "@/components/navbarButton";
import { cornerCategories, edgeCategories } from "@/utils/categoryUtils";

export default function Home() {
  const user = useUser()

  return (
    <Stack direction='row' width='100%' height='calc(100vh - 4rem)' justifyContent='space-evenly'>
      {
        user.user ?
          <>
            <WeeklyProgressCard />
            <Grid container spacing={2} width={'35%'}>
              <Grid size={6}>
                <ProgressCard
                  title='Corners'
                  type='corner'
                  totalCases={cornerCategories.Total}
                  color='secondary'
                  icon={<CornerGridIcon sx={{ fontSize: '100%', width: '50%', height: '50%' }} />}
                  href='corners'
                />
              </Grid>
              <Grid size={6}>
                <ProgressCard
                  title='Edges'
                  type='edge'
                  totalCases={edgeCategories.Total}
                  color='primary'
                  icon={<EdgeGridIcon sx={{ fontSize: '100%', width: '50%', height: '50%' }} />}
                  href='/edges'
                />
              </Grid>
              <Grid size={6}>
                <ProgressCard
                  title='Words'
                  type='letterPair'
                  nonPercent
                  totalCases={24 * 24}  // 24 letters for lettering schemes
                  color='success'
                  icon={<TextFieldsIcon sx={{ fontSize: '100%', width: '50%', height: '50%' }} />}
                  href='/letterPairs'
                />
              </Grid>
              <Grid size={6}>
                <ProgressCard
                  title={'Overall (Algorithms)'}
                  type='overall'
                  totalCases={cornerCategories.Total + edgeCategories.Total}
                  color='error'
                  icon={<CalculateIcon sx={{ fontSize: '100%', width: '50%', height: '50%' }} />}
                />
              </Grid>
            </Grid>
          </>
          :
          <StyledCard>
            <Stack direction='column' spacing={5}>
              <Stack direction='column'>
                <Typography variant='cardHeader'>Welcome to Learn 3 Style, the 3-Style blindfolded method learning tool</Typography>
                <Typography variant='cardSubheader'><Link href='/login'>Log in or create an account</Link> to start tracking your progress in learning the 3-Style method and what words you use for letter pairs.</Typography>
                <Typography variant='cardSubheader'>Or explore what algorithms and words other people have submitted to our database!</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-evenly' width='100%'>
                <Stack direction='column'>
                  <Typography variant='cardHeader'>Check out algorithms for:</Typography>
                  <Stack direction='row' justifyContent='space-evenly'>
                    <NavbarButton color='secondary' text="Corners" href='/corners' icon={<CornerGridIcon />} />
                    <NavbarButton color='primary' text="Edges" href='/edges' icon={<EdgeGridIcon />} />
                  </Stack>
                </Stack>
                <Stack direction='column'>
                  <Typography variant='cardHeader'>Or words for letter pairs:</Typography>
                  <Stack direction='row' justifyContent='space-evenly'>
                    <NavbarButton color='success' text="Letter Pairs" href='/letterPairs' icon={<TextFieldsIcon />} />
                  </Stack>
                </Stack>
              </Stack>

            </Stack>
          </StyledCard>
      }
    </Stack>
  );
}
