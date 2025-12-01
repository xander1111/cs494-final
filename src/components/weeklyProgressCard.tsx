import { Stack, Typography } from "@mui/material";

import TextFieldsIcon from '@mui/icons-material/TextFields';
import CalculateIcon from '@mui/icons-material/Calculate';

import StyledCard from "@/components/styledCard";
import StyledDivider from "@/components/styledDivider";
import { WeeklyProgressEntry } from "@/components/weeklyProgressEntry";
import { CornerGridIcon } from "@/components/cornerGridIcon";
import { EdgeGridIcon } from "@/components/edgeGridIcon";

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
                    <WeeklyProgressEntry
                        header="Algorithms Learned"
                        subheader="Learned [47] total new algorithms"
                        color='error.main'
                        icon={<CalculateIcon />}
                    />
                    <WeeklyProgressEntry
                        header="Corners Learned"
                        subheader="Learned [35] new algorithms"
                        color='secondary.main'
                        icon={<CornerGridIcon />}
                    />
                    <WeeklyProgressEntry
                        header="Edges Learned"
                        subheader="Learned [12] new algorithms"
                        color='primary.main'
                        icon={<EdgeGridIcon />}
                    />
                    <WeeklyProgressEntry
                        header="Letter Pairs Added"
                        subheader="Added [60] new letter pairs"
                        color='success.main'
                        icon={<TextFieldsIcon />}
                    />
                </Stack>

            </Stack>
        </StyledCard>
    )
}
