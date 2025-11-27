import { Stack, Typography } from "@mui/material";

import StyledCard from "@/components/styledCard";
import StyledDivider from "@/components/styledDivider";
import { WeeklyProgressEntry } from "@/components/weeklyProgressEntry";

export function WeeklyProgressCard() {
    return (
        <StyledCard>
            <Stack>
                <Typography variant="cardHeader">Weekly Progress</Typography>
                <Stack spacing={0}>
                    <Typography variant="cardSubheader">Estimated completion date:</Typography>
                    <Typography variant="cardSubheader">[Jan 14, 2026]</Typography>
                </Stack>

                <StyledDivider />

                <Stack alignItems='flex-start'>
                    <WeeklyProgressEntry header="Algorithms Learned" subheader="Learned [47] total new algorithms" color='error.main' letter="A" />
                    <WeeklyProgressEntry header="Corners Learned" subheader="Learned [35] new algorithms" color='secondary.main' letter="C" />
                    <WeeklyProgressEntry header="Edges Learned" subheader="Learned [12] new algorithms" color='primary.main' letter="E" />
                    <WeeklyProgressEntry header="Letter Pairs Added" subheader="Added [60] new letter pairs" color='success.main' letter="L" />
                </Stack>

            </Stack>
        </StyledCard>
    )
}
