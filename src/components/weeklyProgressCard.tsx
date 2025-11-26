import { Box, Stack, Typography } from "@mui/material";

import StyledCard from "./styledCard";
import StyledDivider from "./styledDivider";
import { ProgressCard } from "./progressCard";

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
                    <ProgressCard header="Algorithms Learned" subheader="Learned [47] total new algorithms" color='error.main' />
                    <ProgressCard header="Corners Learned" subheader="Learned [35] new algorithms" color='secondary.main' />
                    <ProgressCard header="Edges Learned" subheader="Learned [12] new algorithms" color='primary.main' />
                    <ProgressCard header="Letter Pairs Added" subheader="Added [60] new letter pairs" color='success.main' />
                </Stack>

            </Stack>
        </StyledCard>
    )
}
